import { Student } from "../../auth/models/user.js";
import Roadmap from "../models/roadmap.js";
import Module from "../models/module.js";
import Topic from "../models/topic.js";
import RoadmapProgress from "../models/roadmapProgress.js";
import ProjectCollab from "../models/projectCollab.js";
import Tag from "../models/tag.js";



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

        const project = await ProjectCollab.findById(projecthubId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        if (String(project.creator || project.student) !== String(userId)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await ProjectCollab.updateOne(
            { _id: projecthubId },
            { $addToSet: { tags: tag } }
        );

        await Tag.updateOne(
            { name: tag },
            { count: { $inc: 1 } }
        );

        const updated = await ProjectCollab.findById(projecthubId);
        return res.status(200).json({ message: "Tag added", tags: updated.tags });
    } catch (err) {
        console.error("addTagToProject:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const removeTagFromProject = async (req, res) => {
    try {
        const projecthubId = req.params.projecthubId;
        const tag = req.params.tag;
        const userId = req.session?.userId || req.user?.id;

        if (!tag) return res.status(400).json({ message: "tag param required" });

        const project = await ProjectCollab.findById(projecthubId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        if (String(project.creator || project.student) !== String(userId)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await ProjectCollab.updateOne(
            { _id: projecthubId },
            { $pull: { tags: tag } }
        );

        await Tag.updateOne(
            { name: tag },
            { count: { $inc: -1 } }
        );

        const updated = await ProjectCollab.findById(projecthubId);
        return res.status(200).json({ message: "Tag removed", tags: updated.tags });
    } catch (err) {
        console.error("removeTagFromProject:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const deleteProjectCollab = async (req, res) => {
    try {
        const { projecthudId } = req.params.projecthubId;
        const projectCollab = await ProjectCollab.findById(projecthudId);

        if (!projectCollab) {
            return res.status(404).json({ message: "Project not found" });
        }

        await ProjectCollab.deleteOne({ _id: projectCollab._id });
        return res.status(200).json({ message: "Project removed" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

export const filterProjectCollab = async (req, res) => {
    try {
        const { tags } = req.body;
        const filter = await Tag.find({name : {$in : tags}});
        const projectCollabs = await ProjectCollab.find(filter)
        
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
