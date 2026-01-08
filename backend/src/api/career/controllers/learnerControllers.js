import { Student } from "../../auth/models/user.js";
import Roadmap from "../models/roadmap.js";
import Module from "../models/module.js";
import Topic from "../models/topic.js";
import RoadmapProgress from "../models/roadmapProgress.js";
import ProjectCollab from "../models/projectCollab.js";
import Tag from "../models/tag.js";

import { executeCode } from "../services/execeuteCode.js";
import { batchRunCode } from "../services/batchRunCode.js";
import { getLanguages } from "../services/getLanguages.js";
import TestCase from "../models/testCases.js";
import CodingQuestion from "../models/codingQuestions.js";
import ProblemCodeSubmission from "../models/problemCodeSubmissions.js";
import Language from "../models/language.js";
import TopicCodeSubmission from "../models/topicCodeSubmission.js";
import { language } from "googleapis/build/src/apis/language/index.js";

export const home = async (req, res) => {
    try {

        const userId = req.session?.userId || req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const user = await Student.findById(userId).select('-password').lean();

        if (!user) {
            return res.status(404).json({ message: "Student not found" });
        }

        const roadmaps = await Student.find({ _id: user._id }).select("-_id -__t roadmaps").populate({
            path: "roadmaps",
            select: "-_id title description domain level"
        });

        return res.status(200).json({ message: "Roadmaps: ", roadmaps });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const enrollRoadmap = async (req, res) => {
    try {
        const studentId = req.session.userId || req.user?.id;
        const { roadmapId } = req.params;
        if (!studentId) return res.status(401).json({ message: "Not authenticated" });

        const modules = await Module.find({ roadmap: roadmapId })
            .select("topics")
            .populate("topics");

        const docs = [];

        for (const m of modules) {
            for (const t of m.topics) {
                docs.push({
                    student: studentId,
                    roadmap: roadmapId,
                    module: m._id,
                    topic: t._id,
                    completed: false,
                    codeAttempts: []
                });
            }
        }

        if (docs.length === 0) {
            return res.status(400).json({ message: "No topics found for roadmap" });
        }

        let inserted = 0;
        try {
            const result = await RoadmapProgress.insertMany(docs, { ordered: false });
            inserted = result.length;
        } catch (err) {
            if (err.code === 11000 || err.name === "BulkWriteError") {
                inserted = err.result?.nInserted || 0;
            } else {
                throw err;
            }
        }

        await Student.findByIdAndUpdate(studentId, { $addToSet: { roadmaps: roadmapId } });

        return res.status(201).json({
            message: "Enrolled",
            inserted
        });

    } catch (err) {
        console.error("enrollRoadmap error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};


export const derollRoadmap = async (req, res) => {
    try {
        const { roadmapId } = req.params;
        const roadmap = await Roadmap.findById(roadmapId);

        const userId = req.session?.userId || req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const user = await Student.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "Student not found" });
        }

        user.roadmaps.pull(roadmap._id);
        RoadmapProgress.deleteMany({roadmap : roadmapId, student: userId});
        await user.save();

        return res.status(200).json({ message: "Stopped roadmap" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getAllModules = async (req, res) => {
    try {
        const { roadmapId } = req.params;
        const modules = await Module.find({ roadmap: roadmapId }).select("description title index -_id").sort({ index: 1 });


        res.status(200).json({ message: "Modules: ", modules });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

//Topic

export const runCodeForTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { language_id, source_code } = req.body;

        if (!language_id || !source_code) {
            return res.status(400).json({
                message: "language_id and source_code are required"
            });
        }

        const topic = await Topic.findById(topicId)
            .select("testCases")
            .populate({
                path: "testCases",
                match: { visible: true },
                select: "-_id input output"
            });

        if (!topic || !topic.testCases?.length) {
            return res.status(404).json({
                message: "No visible testcases found for this topic"
            });
        }

        let testCases = topic.testCases;
        const encode = (str) =>
            Buffer.from(str ?? "").toString("base64");

        const submissions = topic.testCases.map(tc => ({
            language_id,
            source_code: encode(source_code),
            stdin: encode(tc.input)
        }));

        const normalize = (s = "") =>
            s.replace(/\r\n/g, "\n").trim();

        const judgeResult = await batchRunCode(submissions);
        const results = judgeResult.submissions;

        let verdict = "Accepted";
        let failedTCIndex;
        let TC = {};
        let r;
        for (let i = 0; i < results.length; i++) {
            r = results[i];

            if (r.statusId !== 3) {
                verdict = r.status;
                break;
            }

            if (normalize(r.stdout) !== normalize(topic.testCases[i].output)) {
                verdict = "Wrong Answer";
                failedTCIndex = i;
                TC = testCases[failedTCIndex];
                break;
            }


        }

        return res.status(200).json({
            topicId,
            failedTCIndex,
            input: TC ? TC.input : null,
            expectedOutput: TC ? TC.output : null,
            actualOutput: r.stdout,
            totalTestcases: submissions.length,
            verdict
        });

    } catch (err) {
        console.error("runCodeForTopic:", err);
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};


export const submitCodeToTopic = async (req, res) => {
    try {
        const { language_id, source_code } = req.body;
        const topicId = req.params.topicId;
        const userId = req.session?.userId || req.user?.id;

        if (!language_id || !source_code) {
            return res.status(400).json({
                message: "language_id and source_code are required"
            });
        }

        const testcases = await TestCase
            .find({ topic: topicId })
            .select("input output");

        if (!testcases.length) {
            return res.status(404).json({
                message: "No testcases found for this topic"
            });
        }

        const encode = (str) =>
            Buffer.from(str ?? "").toString("base64");

        const submissions = testcases.map(tc => ({
            language_id: language_id,
            source_code: encode(source_code),
            stdin: encode(tc.input)
        }));

        const normalize = (s = "") =>
            s.replace(/\r\n/g, "\n").trim();

        const judgeResult = await batchRunCode(submissions);
        const results = judgeResult.submissions;

        let verdict = "Accepted";
        let failedTCIndex;
        let TC = {};
        let r;
        for (let i = 0; i < results.length; i++) {
            r = results[i];

            if (r.statusId !== 3) {
                verdict = r.status;
                break;
            }

            if (normalize(r.stdout) !== normalize(testcases[i].output)) {
                verdict = "Wrong Answer";
                failedTCIndex = i;
                TC = testcases[failedTCIndex];
                break;
            }
        }

        const languageId = await Language.findOne({ judge0LanguageId: language_id });

        if (verdict == "Accepted") {
            await TopicCodeSubmission.create({
                topic: topicId,
                studentId: userId,
                languageId: languageId._id,
                sourceCode: source_code,
                verdict
            })

            await RoadmapProgress.updateOne({ topic: topicId }, {
                $set: { completed: true }
            })
        }

        return res.status(200).json({
            failedTCIndex,
            input: TC ? TC.input : null,
            expectedOutput: TC.output,
            actualOutput: r.stdout,
            totalTestcases: testcases.length,
            verdict
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

export const getAllTopicSubmissions = async (req, res) => {
    try {
        const userId = req.session?.userId || req.user?.id;
        const topicId = req.params.topicId;

        const submissions = await TopicCodeSubmission.find({
            studentId: userId,
            topic: topicId
        }).select("-studentId -topic -sourceCode -__v").populate({
            path: "languageId",
            select: "-_id key"
        }).sort({ createdAt: -1 });

        return res.status(200).json(submissions);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

export const getTopicSubmission = async (req, res) => {
    try {
        const { submissionId } = req.params;

        const submission = await TopicCodeSubmission.findById(submissionId).select("-_id sourceCode verdict languageId").populate({
            path: "languageId",
            select: "-_id key"
        }).sort({ createdAt: -1 });

        return res.status(200).json(submission);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

export const getAllTopics = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const topics = await Topic.find({ module: moduleId }).select("index title -_id").sort({ index: 1 });
        const quiz = await Module.findById(moduleId).select("-_id quiz").populate({
            path: "quiz",
            select: "-_id title shuffleQuestions"
        })
        res.status(200).json({ message: topics, quiz });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getTopic = async (req, res) => {
    try {
        const { moduleId, topicId } = req.params;
        const topic = await Topic.findOne({ _id: topicId }).select("-_id -slug -module").populate({
            path: "testCases",
            match: { visible: true },
            select: "-_id input output explanation"
        });

        const userId = req.session?.userId || req.user?.id;
        const completed = await RoadmapProgress.findOne({ studentId: userId, topic: topicId }).select("-_id completed");

        const next = await Topic.findOne({ module: moduleId, index: topic.index + 1 }).select("_id");
        const prev = await Topic.findOne({ module: moduleId, index: topic.index - 1 }).select("_id");
        //If null is returned in next, then disable next button or hide it and vice versa in prev 
        res.status(200).json({ topic, next, prev, completed });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const profile = async (req, res) => {
    try {
        const studentId = req.session?.userId || req.user?.id;
        const student = await Student.findById(studentId).select("-_id -__t studentId name email").populate({
            path: "department",
            select: "-_id deptName"
        });

        const enrolledRoadmaps = await Student.findById(studentId).select("-_id -__t roadmaps").populate({
            path: "roadmaps",
            select: "title",
            populate: {
                path: "modules",
                select: "index title topics",
                populate: {
                    path: "topics",
                    select: "index"
                }
            }
        }).lean();

        const enrolledRoadmapsProgress = await Promise.all(
            enrolledRoadmaps.roadmaps.map(async (r) => {
                const topicsCompleted = await RoadmapProgress.countDocuments({
                    student: studentId,
                    roadmap: r._id,
                    completed: true
                });

                const totalTopics = r.modules.reduce(
                    (sum, mod) => sum + mod.topics.length,
                    0
                );

                return {
                    title: r.title,
                    completion: (topicsCompleted / totalTopics) * 100
                }
            })
        )

        res.status(200).json({ student, enrolledRoadmapsProgress });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const createProjectCollab = async (req, res) => {
    try {
        const studentId = req.session?.userId || req.user?.id;
        if (!studentId) {
            return res.status(401).json({ message: "Unauthorized: No student ID found" });
        }

        const { title, description, tags = [] } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const project = await ProjectCollab.create({
            student: studentId,
            title,
            description,
            tags,
        });

        res.status(201).json({ message: "Project collaboration created successfully", project });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getAllProjectCollab = async (req, res) => {
    try {
        const studentId = req.session?.userId || req.user?.id;
        if (!studentId) {
            return res.status(401).json({ message: "Unauthorized: No student ID found" });
        }

        const projectCollabs = await ProjectCollab.find({ student: { $ne: studentId } }).sort({ createdAt: -1 });

        res.status(201).json({ message: projectCollabs });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getProjectCollab = async (req, res) => {
    try {
        const projecthubId = req.params.projecthubId;

        if (!projecthubId) {
            return res.status(400).json({ message: "projecthubId is required" });
        }

        const projectCollab = await ProjectCollab.findById(projecthubId);

        if (!projectCollab) {
            return res.status(404).json({ message: "Collaboration not found" });
        }

        return res.status(200).json({ projectCollab });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const editProjectCollab = async (req, res) => {
    try {
        const projecthubId = req.params.projecthubId;
        const userId = req.session?.userId || req.user?.id;

        if (!projecthubId) {
            return res.status(400).json({ message: "projecthubId is required" });
        }

        const { title, description, status } = req.body;

        const projectCollab = await ProjectCollab.findById(projecthubId);
        if (!projectCollab) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (String(projectCollab.creator || projectCollab.student) !== String(userId)) {
            return res.status(403).json({ message: "Forbidden: not project owner" });
        }

        if (title !== undefined) projectCollab.title = title;
        if (description !== undefined) projectCollab.description = description;
        if (status !== undefined) projectCollab.status = status;


        await projectCollab.save();

        return res.status(200).json({ message: "Project updated", project: projectCollab });
    } catch (error) {
        console.error("editProjectCollab:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const addTagToProjectCollab = async (req, res) => {
    try {
        const projecthubId = req.params.projecthubId;
        const userId = req.session?.userId || req.user?.id;
        const { tag } = req.body;

        if (!tag) return res.status(400).json({ message: "tag is required" });

        const normalizedTag = tag.toLowerCase();


        const tagDoc = await Tag.findOne({ name: normalizedTag });
        if (!tagDoc) return res.status(404).json({ message: "Tag not found" });


        const project = await ProjectCollab.findById(projecthubId);
        if (!project) return res.status(404).json({ message: "Project not found" });


        if (String(project.creator || project.student) !== String(userId)) {
            return res.status(403).json({ message: "Forbidden" });
        }


        const tagAlreadyPresent = project.tags.some(
            id => id.toString() === tagDoc._id.toString()
        );

        if (tagAlreadyPresent) {
            return res.status(200).json({
                message: "Tag already exists in project",
                countIncremented: false
            });
        }


        await ProjectCollab.updateOne(
            { _id: projecthubId },
            { $push: { tags: tagDoc._id } }
        );


        await Tag.updateOne(
            { _id: tagDoc._id },
            { $inc: { count: 1 } }
        );

        return res.status(200).json({
            message: "Tag added",
            tag: normalizedTag,
            countIncremented: true
        });

    } catch (err) {
        console.error("addTagToProject:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const removeTagFromProject = async (req, res) => {
    try {
        const projecthubId = req.params.projecthubId;
        const { tag } = req.body;
        const userId = req.session?.userId || req.user?.id;

        if (!tag) {
            return res.status(400).json({ message: "tag param required" });
        }


        const tagDoc = await Tag.findOne({ name: tag });
        if (!tagDoc) {
            return res.status(404).json({ message: "Tag not found" });
        }

        const tagId = tagDoc._id;


        const project = await ProjectCollab.findById(projecthubId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        if (String(project.creator || project.student) !== String(userId)) {
            return res.status(403).json({ message: "Forbidden" });
        }


        const tagExists = project.tags.some(id => id.toString() === tagId.toString());
        if (!tagExists) {
            return res.status(200).json({
                message: "Tag was not in project",
                countDecremented: false
            });
        }


        await ProjectCollab.updateOne(
            { _id: projecthubId },
            { $pull: { tags: tagId } }
        );


        await Tag.updateOne(
            { _id: tagId },
            { $inc: { count: -1 } }
        );

        const updated = await ProjectCollab.findById(projecthubId);

        return res.status(200).json({
            message: "Tag removed",
            tag: tag,
            countDecremented: true,
            tags: updated.tags
        });

    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};


export const deleteProjectCollab = async (req, res) => {
    try {
        const projecthubId = req.params.projecthubId;

        const projectCollab = await ProjectCollab.findById(projecthubId);
        if (!projectCollab) {
            return res.status(404).json({ message: "Project not found" });
        }

        await Tag.updateMany(
            { _id: { $in: projectCollab.tags } },
            { $inc: { count: -1 } }
        );

        await ProjectCollab.deleteOne({ _id: projecthubId });

        return res.status(200).json({ message: "Project removed" });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const filterProjectCollab = async (req, res) => {
    try {
        const { tags } = req.body;
        const filter = await Tag.find({ name: { $in: tags } });
        const tagIds = filter.map(tag => tag._id);
        const projectCollabs = await ProjectCollab.find({
            tags: { $in: tagIds }
        })

        return res.status(200).json({ message: projectCollabs })
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const likeProjectCollab = async (req, res) => {
    try {
        const { projectId } = req.body;
        const userId = req.session?.userId || req.user?.id;

        if (!projectId) return res.status(400).json({ message: "projectId required" });
        if (!userId) return res.status(400).json({ message: "login required" });

        const project = await ProjectCollab.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        const alreadyLiked = project.likedBy.includes(userId);

        if (alreadyLiked) {
            return res.status(400).json({ message: "Already liked" });
        }

        await ProjectCollab.updateOne(
            { _id: projectId },
            {
                $push: { likedBy: userId },
                $inc: { likes: 1 }
            }
        );

        return res.status(200).json({ message: "Liked" });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const unlikeProjectCollab = async (req, res) => {
    try {
        const { projectId } = req.body;
        const userId = req.session?.userId || req.user?.id;

        if (!projectId) return res.status(400).json({ message: "projectId required" });
        if (!userId) return res.status(400).json({ message: "login required" });

        const project = await ProjectCollab.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        const alreadyLiked = project.likedBy.includes(userId);

        if (!alreadyLiked) {
            return res.status(400).json({ message: "You haven't liked this project" });
        }

        await ProjectCollab.updateOne(
            { _id: projectId },
            {
                $pull: { likedBy: userId },
                $inc: { likes: -1 }
            }
        );

        return res.status(200).json({ message: "Unliked" });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const searchProjectCollab = async (req, res) => {
    try {
        const q = req.query.q?.trim() || "";

        const results = await ProjectCollab.find(
            { $text: { $search: q } },
            { score: { $meta: "textScore" } }
        )
            .sort({ score: { $meta: "textScore" } })
            .limit(30);

        return res.status(200).json({ results });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const autocompleteProjectCollab = async (req, res) => {
    try {
        const q = req.query.q?.trim();

        if (!q) {
            return res.status(200).json({ suggestions: [] });
        }

        const regex = new RegExp(q, "i");

        const suggestions = await ProjectCollab.find(
            {
                $or: [
                    { title: { $regex: regex } },
                    { description: { $regex: regex } }
                ]
            }
        )
            .select("-_id title description status")
            .limit(10);

        return res.status(200).json({ suggestions });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

//Coding

export const listLanguages = async (req, res) => {
    try {
        const languages = await getLanguages();
        return res.status(200).json({ languages });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch languages",
            error: error.message
        });
    }
};

export const getAllProblems = async (req, res) => {
    try {
        const problems = await CodingQuestion.find().select("-_id problemId title difficulty");
        return res.status(200).json({ problems });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch problems",
            error: error.message
        });
    }
}

export const getProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const problem = await CodingQuestion.findOne({ problemId }).select("-_id -__v -judge -idealComplexity -slug -problemId -testCases").populate({
            path: "languagesAllowed",
            select: "-_id -__v -key"
        });

        const tc = await CodingQuestion.findOne({ problemId }).select("testCases");

        const samples = tc.testCases.filter(tc => !tc.hidden);
        return res.status(200).json({ problem, samples });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch problems",
            error: error.message
        });
    }
}

export const runCodeForProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { language_id, source_code } = req.body;

        if (!language_id || !source_code) {
            return res.status(400).json({
                message: "language_id and source_code are required"
            });
        }

        const problem = await CodingQuestion.findById(problemId).select("testCases");

        const samples = problem.testCases.filter(tc => !tc.hidden);


        if (!samples) {
            return res.status(404).json({
                message: "No sample testcases found for this problem"
            });
        }


        const encode = (str) =>
            Buffer.from(str ?? "").toString("base64");

        const submissions = samples.map(tc => ({
            language_id,
            source_code: encode(source_code),
            stdin: encode(tc.input)
        }));

        const normalize = (s = "") =>
            s.replace(/\r\n/g, "\n").trim();

        const judgeResult = await batchRunCode(submissions);
        const results = judgeResult.submissions;

        let verdict = "Accepted";
        let failedTCIndex;
        let TC = {};
        let r;
        for (let i = 0; i < results.length; i++) {
            r = results[i];

            if (r.statusId !== 3) {
                verdict = r.status;
                break;
            }

            if (normalize(r.stdout) !== normalize(samples[i].output)) {
                verdict = "Wrong Answer";
                failedTCIndex = i;
                TC = samples[failedTCIndex];
                break;
            }
        }

        res.status(201).json({
            verdict,
            testcases: samples.length,
            failedTC: failedTCIndex + 1,
            input: TC ? TC.input : null,
            expectedOutput: TC ? TC.output : null,
            actualOutput: r.stdout
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

export const submitCodeToProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { language_id, source_code } = req.body;
        const userId = req.session?.userId || req.user?.id;

        if (!language_id || !source_code) {
            return res.status(400).json({
                message: "language_id and source_code are required"
            });
        }

        const idealComplexity = await CodingQuestion.findOne({ problemId }).select("-_id idealComplexity");

        const hiddenTC = await CodingQuestion.findOne({ problemId }).select("-_id testCases");

        if (!hiddenTC) {
            return res.status(404).json({
                message: "No sample testcases found for this problem"
            });
        }

        const tc = hiddenTC.testCases;

        const encode = (str) =>
            Buffer.from(str ?? "").toString("base64");

        const submissions = tc.map(tc => ({
            language_id,
            source_code: encode(source_code),
            stdin: encode(tc.input)
        }));

        const normalize = (s = "") =>
            s.replace(/\r\n/g, "\n").trim();

        const judgeResult = await batchRunCode(submissions);
        const results = judgeResult.submissions;

        const userMaxTimeMs = Math.max(
            ...results.map(r => Number(r.time || 0))
        );

        const userMaxMemoryKb = Math.max(
            ...results.map(r => Number(r.memory || 0))
        );

        let verdict = "Accepted";
        let failedTCIndex;
        let TC = {};
        let r;

        for (let i = 0; i < results.length; i++) {
            r = results[i];

            if (r.statusId !== 3) {
                verdict = r.status;
                break;
            }

            if (normalize(r.stdout) !== normalize(tc[i].output)) {
                verdict = "Wrong Answer";
                failedTCIndex = i;
                TC = tc[failedTCIndex];
                break;
            }
        }

        const languageId = await Language.findOne({ judge0LanguageId: language_id });
        const problem = await CodingQuestion.findOne({ problemId });

        if (verdict == "Accepted") {
            await ProblemCodeSubmission.create({
                problemId: problem._id,
                studentId: userId,
                languageId: languageId._id,
                sourceCode: source_code,
                verdict,
                userMaxTimeMs,
                userMaxMemoryKb
            })
        }

        res.status(201).json({
            verdict,
            testcases: tc.length,
            failedTC: failedTCIndex + 1,
            expectedOutput: TC ? TC.output : null,
            actualOutput: verdict == "Accepted" ? null : r.stdout,
            idealComplexity: verdict == "Accepted" ? idealComplexity.idealComplexity : null,
            userMaxTimeMs: verdict == "Accepted" ? userMaxTimeMs : null,
            userMaxMemoryKb: verdict == "Accepted" ? userMaxMemoryKb : null
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

export const getAllProblemSubmissions = async (req, res) => {
    try {
        const userId = req.session?.userId || req.user?.id;
        const { problemId } = req.params;

        const problem = await CodingQuestion.findOne({ problemId }).select("_id");
        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        const submissions = await ProblemCodeSubmission.find({
            studentId: userId,
            problemId: problem._id
        })
            .populate({ 
                path: "languageId",
                select: "-_id key"
            })
            .select("languageId verdict userMaxTimeMs userMaxMemoryKb createdAt")
            .sort({ createdAt: -1 });

        res.status(200).json({ submissions });
    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

export const getProblemSubmission = async (req, res) => {
    try {
        const userId = req.session?.userId || req.user?.id;
        const { problemId } = req.params;

        const problem = await CodingQuestion.findOne({ problemId }).select("_id");
        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        const submission = await ProblemCodeSubmission.find({
            studentId: userId,
            problemId: problem._id
        })
            .populate({ 
                path: "languageId",
                select: "-_id key"
            })
            .select("languageId verdict sourceCode userMaxTimeMs userMaxMemoryKb createdAt")
            .sort({ createdAt: -1 });

        res.status(200).json({ submission });
    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}