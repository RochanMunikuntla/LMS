import bcrypt from "bcryptjs";
import { Faculty } from "../models/user.js";
import Assignment from "../models/assignment.js";
import { Quiz } from "../models/quiz.js";
import { Attempt } from "../models/quiz.js";
import { parseGIFT } from "../utils/giftParser.js";
import { Question } from "../models/quiz.js";
import Announcement from "../models/announcement.js";
import fs from "fs";
import Material from "../models/materials.js";
import { triggerAsyncId } from "async_hooks";


// backend logic controllers

export const authFaculty = async (req, res) => {
    try {
        const { facultyId, password } = req.body;
        const faculty = await Faculty.findOne({ facultyId });
        if (!Faculty) {
            return res.status(400).json({ message: "Invalid Id or password" });
        }
        const isValidPassword = await bcrypt.compare(password, faculty.password);
        req.session.user = {
            id: faculty._id,
            facultyId: faculty.facultyId,
            name: faculty.name,
            doj: faculty.doj,
            email: faculty.email,
            department: faculty.department,
            role: "faculty"
        };
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid Id or password" });
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

//Assignment

export const createAssignment = async (req, res) => {
    try {
        const { title, description, dueDate, courseId } = req.body;
        const assignment = new Assignment({ title, description, dueDate, courseId });
        await assignment.save();
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const editAssignment = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        assignment.title = title || assignment.title;
        assignment.description = description || assignment.description;
        assignment.dueDate = dueDate || assignment.dueDate;
        await assignment.save();
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const removeAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        await Assignment.deleteOne({ assignment });
        res.status(200).json({ message: "Assignment removed" });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const gradeAssignment = async (req, res) => {
    try {
        const { grade } = req.body;
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        assignment.grade = grade ?? assignment.grade;
        await assignment.save();
    } catch (error) {
        console.log("Error: ", error);
    }
}

//Quiz

export const uploadQuestions = async (req, res) => {
    try {
        const filePath = req.file.path;
        const content = fs.readFileSync(filePath, "utf8");
        const questions = parseGIFT(content);

        const savedQuestions = await Question.insertMany(questions);

        res.json({ message: "Questions imported", count: savedQuestions.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to import GIFT file", error: err.message });
    }
}

export const deleteQuestions = async (req, res) => {
    try {
        await Question.deleteMany();
        return res.status(200).json({ message: "Deleted questions" });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const createQuiz = async (req, res) => {
    try {
        const { name, questionIds, shuffleQuestions, courseId } = req.body;

        if (!name || !questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
            return res.status(400).json({ message: "Quiz name and at least one question are required." });
        }

        const validQuestions = await Question.find({ _id: { $in: questionIds } });
        if (validQuestions.length !== questionIds.length) {
            return res.status(400).json({ message: "Some questions are invalid." });
        }

        const quiz = new Quiz({
            title: name,
            questions: questionIds,
            shuffleQuestions: shuffleQuestions || false,
            course: courseId || null,
            published: false
        });

        await quiz.save();

        res.status(201).json({ message: "Quiz created successfully!", quiz });
    } catch (err) {
        console.error("Error creating quiz:", err);
        res.status(500).json({ message: "Failed to create quiz", error: err.message });
    }
};

export const submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;
        const quiz = await Quiz.findById(quizId).populate("questions");

        let score = 0;
        quiz.questions.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) {
                score += q.marks;
            }
        });

        const attempt = await Attempt.create({
            quiz: quizId,
            student: req.user._id,
            answers,
            score
        });
        res.json({ score, attempt });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send("Something went wrong");
    }
}

//Materials

export const postMaterials = async (req, res) => {
    try {
        const { title, type, topic, url } = req.body;
        const { courseId } = req.params;
        const material = new Material({ title, type, topic, url, course: courseId });
        await material.save();
        res.json({ message: "Material posted" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send("Something went wrong");
    }
}

export const editMaterials = async (req, res) => {
    try {
        const { title, type, topic, url } = req.body;
        const material = await Material.findById(req.params.id);

        material.title = title || material.title;
        material.type = type || material.type;
        material.topic = topic || material.topic;
        material.url = url || material.url;

        await material.save();
        res.json({ message: "Material Updated" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send("Something went wrong");
    }
}

export const deleteMaterials = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);

        if (!material) {
            res.json({ message: "No material found" });
        }

        await material.deleteOne();
        res.json({ message: "Material deleted" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send("Something went wrong");
    }
}

// frontend rendering controllers

export const home = (req, res) => {
    try {
        res.send("home");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const signup = async (req, res) => {
    try {
        res.send("signup");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const login = async (req, res) => {
    try {
        res.send("login");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const profile = (req, res) => {
    try {
        res.send("profile");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json({ message: assignments });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        res.json({ message: assignment });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getQues = async (req, res) => {
    try {
        const ques = await Question.findById(req.params.id);
        res.json({ message: ques });
    } catch (error) {

    }
}

export const getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate({
            path: "questions",
            select: "-__v"
        });;
        res.json({ message: quiz.questions });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.json({ message: announcements });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        res.json({ message: announcement });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getAllMaterials = async (req, res) => {
    try {
        const { courseId } = req.params;
        const materials = await Material.find({ course: courseId });
        res.json({ message: materials });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getMaterial = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ message: "Material not found" });
        }
        res.json({ material });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}