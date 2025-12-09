import bcrypt from "bcryptjs";
import { Student } from "../../auth/models/user.js";
import Task from "../models/task.js";
import Announcement from "../models/announcement.js";
import { Quiz } from "../models/quiz.js";
import { Attempt } from "../models/quiz.js"

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

//Quiz

export const submitQuiz = async (req, res) => {
    try {
        const { studentId } = req.session.user;
        const { importId, answers } = req.body;

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send("Something went wrong");
    }
}


// frontend rendering controllers

export const home = (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const signup = async (req, res) => {
    try {
        res.render("signup");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const login = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const profile = (req, res) => {
    try {
        res.render("profile");
    } catch (error) {
        console.log("Error: ", error);
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
