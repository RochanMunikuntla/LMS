import bcrypt from "bcryptjs";
import { Student } from "../../auth/models/user.js";
import Task from "../models/task.js";
import Announcement from "../models/announcement.js";
import lmsQuiz from "../models/lmsQuiz.js";
import lmsAttempt from "../models/lmsAttempt.js"
import Assignment from "../models/assignment.js";

// backend logic controllers

export const authStudent = async (req, res) => {
    try {
        const { studentId, password } = req.body;
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(400).json({ message: "Invalid Id or password" });
        }

        const isValidPassword = await bcrypt.compare(password, student.password);

        req.session.userId = student._id;
        req.session.user = {
            id: student._id,
            studentId: student.studentId,
            name: student.name,
            email: student.email,
            department: student.department,
            year: student.year,
            dob: student.dob,
            role: "student"
        };

        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid Id or password" });
        }

        res.status(201).json({ message: "Logged in!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to log in", error: error.message });
    }
}


// To-do List

export const addTask = async (req, res) => {
    try {
        const { title, due } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const existingTask = await Task.findOne({ title });
        if (existingTask) {
            return res.status(400).json({ message: "A task with this title already exists" });
        }

        const task = new Task({ title, due });
        await task.save();

        res.status(201).json({ message: "Task created!", task });
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Failed to add task", error: error.message });
    }
};

export const editTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, due, completed } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (title) task.title = title;
        if (due) task.due = new Date(due);
        if (typeof completed === "boolean") task.completed = completed;

        await task.save();
        res.json({ message: "Task updated", task });
    } catch (error) {
        console.error("Error editing task:", error);
        res.status(500).json({ message: "Failed to update task", error: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await Task.deleteOne({ _id: taskId });
        res.json({ message: "Task deleted" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Failed to delete task", error: error.message });
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ due: 1 });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ message: "Failed to fetch task", error: error.message });
    }
};

//Quiz

export const getQuiz = async (req, res) => {
    try {
        const studentId = req.session?.userId || req.user?.id;
        const { quizId } = req.params;

        const quiz = await lmsQuiz
            .findById(quizId)
            .select("title attempts dueAt disabled")
            .populate({
                path: "course",
                select: "courseName courseId"
            });

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        const attemptsCount = await lmsAttempt.countDocuments({
            quiz: quizId,
            student: studentId
        });

        const now = new Date();

        const isGloballyDisabled =
            quiz.disabled ||
            (quiz.dueAt && now > quiz.dueAt);

        const attemptsLeft =
            quiz.attempts != null
                ? Math.max(quiz.attempts - attemptsCount, 0)
                : null;

        const canAttempt =
            !isGloballyDisabled &&
            (attemptsLeft == null || attemptsLeft > 0);

        res.status(200).json({
            quiz: {
                _id: quiz._id,
                title: quiz.title,
                course: quiz.course,
                dueAt: quiz.dueAt
            },
            canAttempt,
            attemptsLeft,
            isExpired: quiz.dueAt ? now > quiz.dueAt : false
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};


export const submitQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const studentId = req.session?.userId || req.user?.id;
        const { answers } = req.body;

        if (!studentId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: "Answers are required" });
        }

        // 1️⃣ Fetch quiz config + questions
        const quiz = await lmsQuiz
            .findById(quizId)
            .select("questions dueAt disabled attempts")
            .populate({
                path: "questions",
                select: "index type options answer tolerance marks"
            })
            .lean();

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        const now = new Date();

        // 2️⃣ Global disable check (faculty/manual)
        if (quiz.disabled) {
            return res.status(403).json({
                message: "Quiz is disabled"
            });
        }

        // 3️⃣ Due date enforcement
        if (quiz.dueAt && now > quiz.dueAt) {
            return res.status(403).json({
                message: "Quiz submission deadline has passed"
            });
        }

        // 4️⃣ Attempt limit enforcement (per student)
        if (Number.isInteger(quiz.attempts)) {
            const attemptsCount = await lmsAttempt.countDocuments({
                quiz: quizId,
                student: studentId
            });

            if (attemptsCount >= quiz.attempts) {
                return res.status(403).json({
                    message: "Maximum number of attempts reached"
                });
            }
        }

        // =====================
        // Grading logic (unchanged)
        // =====================

        const correctAnswers = {};
        const questionMap = {};

        for (const q of quiz.questions) {
            questionMap[q.index] = q._id;

            if (q.type === "mcq") {
                correctAnswers[q.index] = {
                    type: "mcq",
                    correctOptions: q.options
                        .filter(o => o.isCorrect === true)
                        .map(o => o.index),
                    marks: q.marks
                };
            }

            if (q.type === "tf" || q.type === "numerical") {
                correctAnswers[q.index] = {
                    type: q.type,
                    answer: q.answer,
                    tolerance: q.tolerance,
                    marks: q.marks
                };
            }
        }

        let score = 0;
        const gradedAnswers = [];

        for (const a of answers) {
            const correct = correctAnswers[a.index];
            if (!correct) continue;

            let marksAwarded = 0;

            if (correct.type === "mcq") {
                const submitted = [...(a.selectedOptions || [])].sort();
                const expected = [...correct.correctOptions].sort();

                const isCorrect =
                    submitted.length === expected.length &&
                    submitted.every((v, i) => v === expected[i]);

                if (isCorrect) marksAwarded = correct.marks;
            }

            if (correct.type === "tf") {
                if (a.tfAnswer === correct.answer) {
                    marksAwarded = correct.marks;
                }
            }

            if (correct.type === "numerical") {
                const diff = Math.abs(a.numericalAnswer - correct.answer);
                if (diff <= (correct.tolerance ?? 0)) {
                    marksAwarded = correct.marks;
                }
            }

            score += marksAwarded;

            gradedAnswers.push({
                question: questionMap[a.index],
                selectedOptions: a.selectedOptions,
                tfAnswer: a.tfAnswer,
                numericalAnswer: a.numericalAnswer,
                marksAwarded
            });
        }

        // 5️⃣ Create attempt only after all checks pass
        const attempt = await lmsAttempt.create({
            quiz: quizId,
            student: studentId,
            answers: gradedAnswers,
            score
        });

        res.status(200).json({
            quizId,
            score,
            totalMarks: quiz.questions.reduce((s, q) => s + q.marks, 0),
            attemptId: attempt._id
        });

    } catch (error) {
        console.error("submitQuiz error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const getAttempts = async (req, res) => {
    try {
        const studentId = req.session?.userId || req.user?.id;
        const { quizId } = req.params;

        const attempts = await lmsAttempt.find({ student: studentId, quiz: quizId }).select("score createdAt").sort({ createdAt: -1 });

        res.status(201).json(attempts);
    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

export const reviewQuiz = async (req, res) => {
    try {
        const studentId = req.session?.userId || req.user?.id;
        const { reviewId } = req.params;

        const attempt = await lmsAttempt.findOne({ _id: reviewId, student: studentId }).select("-_id answers score").populate({
            path: "answers.question",
            select: "-_id -importId"
        })

        res.status(201).json(attempt);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

export const dueDates = async (req, res) => {
    try {
        const assignments = await Assignment.find().select("title dueDate");
        if(!assignments){
            return res.status(400).json({ message: "Assignments not found" });
        }

        return res.status(200).json({message: assignments});
    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
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
