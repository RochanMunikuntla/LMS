import Roadmap from "../models/roadmap.js";
import Module from "../models/module.js";
import Topic from "../models/topic.js";
import TestCase from "../models/testCases.js";
import { newRoadmap } from "../../../utils/career/parseRoadmap.js";
import { seedQuiz } from "../../../utils/career/moduleQuiz.js"
import { careerQuiz, careerQuestion } from "../models/careerQuiz.js";
import mongoose from "mongoose";
import fs from "fs/promises";
import Language from "../models/language.js";
import { seedCodingQuestions } from "../../../utils/career/seedCodingQuestions.js";
import ProblemCounter from "../models/problemCounter.js";

export const createRoadmap = async (req, res) => {
    try {
        const roadmap = await newRoadmap();
        return res.status(201).json({ message: "Roadmap created!", roadmapId: roadmap._id });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteRoadmap = async (req, res) => {
    const session = await mongoose.startSession();
    let usingTransaction = true;
    try {
        session.startTransaction();
    } catch (e) {
        usingTransaction = false;
        console.warn('Transactions not supported - running without transaction for deleteRoadmap');
    }
    const opts = usingTransaction ? { session } : undefined;

    try {
        const { roadmapId } = req.params;
        if (!roadmapId || !mongoose.Types.ObjectId.isValid(roadmapId)) {
            if (usingTransaction) { await session.abortTransaction(); session.endSession(); }
            return res.status(400).json({ message: 'Invalid roadmapId' });
        }

        const roadmap = await Roadmap.findById(roadmapId).session(usingTransaction ? session : null);
        if (!roadmap) {
            if (usingTransaction) { await session.abortTransaction(); session.endSession(); }
            return res.status(404).json({ message: 'Roadmap not found' });
        }


        const modules = await Module.find({ roadmap: roadmap._id }).session(usingTransaction ? session : null);
        const moduleIds = modules.map(m => m._id);


        const topics = moduleIds.length ? await Topic.find({ module: { $in: moduleIds } }).session(usingTransaction ? session : null) : [];
        const topicIds = topics.map(t => t._id);


        if (topicIds.length) {
            await TestCase.deleteMany({ topic: { $in: topicIds } }, opts);
        }


        if (topicIds.length) {
            await Topic.deleteMany({ _id: { $in: topicIds } }, opts);
        }


        if (moduleIds.length) {
            await Module.deleteMany({ _id: { $in: moduleIds } }, opts);
        }


        await Roadmap.deleteOne({ _id: roadmap._id }, opts);

        if (usingTransaction) {
            await session.commitTransaction();
            session.endSession();
        }

        return res.status(200).json({ message: 'Roadmap and related modules/topics/testcases deleted' });
    } catch (error) {
        try { if (usingTransaction) await session.abortTransaction(); } catch (e) { }
        if (usingTransaction) session.endSession();
        console.error('deleteRoadmap error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const createModule = async (req, res) => {
    try {
        const { roadmapId } = req.params;
        const { index, slug, title, description } = req.body;

        const roadmap = await Roadmap.findById(roadmapId);
        if (!roadmap) {
            return res.status(404).json({ message: "Roadmap not found" });
        }

        const exisitingModule = await Module.findOne({ roadmapId, slug });
        if (exisitingModule) {
            return res.status(400).json({ message: "Module already exists" });
        }

        const module = new Module({
            index,
            roadmap: roadmapId,
            slug,
            title,
            description
        });

        await module.save();

        roadmap.modules.push(module._id);
        await roadmap.save();

        res.status(201).json({ message: "Module created!", module });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const createTopic = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const { index, title, slug, content } = req.body;

        const module = await Module.findById(moduleId);
        if (!moduleId) {
            return res.status(404).json({ message: "Module not found" });
        }

        const exisitingTopic = await Topic.findOne({ moduleId, slug });
        if (exisitingTopic) {
            return res.status(400).json({ message: "Topic already exists" });
        }

        const topic = new Topic({
            index,
            module: moduleId,
            slug,
            title,
            content
        });

        await topic.save();

        module.topics.push(topic._id);
        await module.save();

        res.status(201).json({ message: "Topic created!", topic });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const createQuiz = async (req, res) => {
    let filePath = null;
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        filePath = req.file.path;

        const seedResult = await seedQuiz(filePath);

        const { importId } = seedResult;

        const questions = await careerQuestion.find({ importId }).select("_id").lean();
        const questionIds = questions.map(q => q._id);

        if (!questionIds.length) {
            await fs.unlink(filePath).catch(() => { });
            return res.status(500).json({ message: "No questions found for importId", importId });
        }

        const { moduleId } = req.params;
        const { title, shuffleQuestions } = req.body;


        const quiz = await careerQuiz.create({
            importId,
            module: moduleId,
            title,
            shuffleQuestions: !!shuffleQuestions,
            questions: questionIds
        });


        if (moduleId) {
            await Module.updateOne({ _id: moduleId }, { $set: { quiz: quiz._id } });
        }


        await fs.unlink(filePath).catch(() => { });

        return res.status(201).json({
            message: "Quiz created successfully",
            quizId: quiz._id,
            importId,
            insertedCount: seedResult.insertedCount,
            total: seedResult.total,
            errors: seedResult.errors
        });
    } catch (err) {
        if (filePath) await fs.unlink(filePath).catch(() => { });
        return res.status(500).json({ message: "Failed to create quiz", error: err.message });
    }
};

export const addLanguage = async (req, res) => {
    try {
        const { key, displayName, judge0LanguageId, boilerPlate } = req.body;

        if (!key || !displayName || !judge0LanguageId || !boilerPlate) {
            return res.status(400).json({ message: "Incomplete information" });
        }

        const language = await Language.create({
            key: key,
            displayName: displayName,
            judge0LanguageId: judge0LanguageId,
            boilerplate: boilerPlate
        })

        return res.status(201).json({ message: "Added Language", language })
    } catch (error) {
        return res.status(500).json({ message: "Failed to create quiz", error: err.message });
    }
}

export const addCodingQuestions = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = req.file.path;

        await seedCodingQuestions(filePath);
        res.status(200).json({ message: "Questions seeded" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add questions", error });
    }
}

export const addProblemCounter = async (req, res) => {
    try {
        const { difficulty } = req.body;

        const problemCounter = await ProblemCounter.create({
            difficulty
        })
        res.status(200).json({ message: "Done", problemCounter });
    } catch (error) {
        return res.status(500).json({ message: "Failed", error });
    }
}