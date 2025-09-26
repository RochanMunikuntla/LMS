import bcrypt from "bcryptjs";
import {Faculty} from "../models/user.js";
import Assignment from "../models/assignment.js";
import Quiz from "../models/quiz.js";
import Attempt from "../models/quiz.js";


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
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });
        await Assignment.deleteOne({ assignment });
    } catch (error) {
        console.log("Error: ", error);
    }
}

// File based assignments(not for quizzes!!!)
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

//This is for quizzes!!!
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

export const assignments = (req, res) => {
    try {
        res.send("assignments");
    } catch (error) {
        console.log("Error: ", error);
    }
}