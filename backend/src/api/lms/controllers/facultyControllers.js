import bcrypt from "bcryptjs";
import { Faculty } from "../../auth/models/user.js";
import Assignment from "../models/assignment.js";
import lmsQuiz from "../models/lmsQuiz.js";
import lmsQuestion from "../models/lmsQuestions.js";
import Announcement from "../models/announcement.js";
import Material from "../models/materials.js";
import Course from "../models/course.js";
import { seedQuiz } from "../../../utils/lms/createQuiz.js"
import lmsAttempt from "../models/lmsAttempt.js";


// backend logic controllers

export const authFaculty = async (req, res) => {
    try {
        const { facultyId, password } = req.body;
        const faculty = await Faculty.findOne({ facultyId });

        if (!faculty) {
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

        res.status(200).json({ message: "Logged in!" });
    } catch (error) {
        console.log("Error: ", error);
    }
}

//Assignment

export const createAssignment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, dueDate, marks } = req.body;
        const assignment = new Assignment({ title, description, dueDate, courseId, marks });
        await assignment.save();
        
        res.status(200).json({ message: "Created!" });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const editAssignment = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const { assignmentId } = await Assignment.findById(req.params.id);
        if (!assignmentId) return res.status(404).json({ message: "Assignment not found" });

        assignmentId.title = title || assignmentId.title;
        assignmentId.description = description || assignmentId.description;
        assignmentId.dueAt = dueDate || assignmentId.dueAt;
        await assignmentId.save();
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const removeAssignment = async (req, res) => {
    try {
        const { assignmentId } = await Assignment.findById(req.params);
        if (!assignmentId) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        await Assignment.deleteOne({ assignmentId });
        res.status(200).json({ message: "Assignment removed" });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const gradeAssignment = async (req, res) => {
    try {
        const { grade } = req.body;
        const { assignmentId } = await Assignment.findById(req.params);
        if (!assignmentId) return res.status(404).json({ message: "Assignment not found" });

        assignmentId.grade = grade ?? assignmentId.grade;
        await assignmentId.save();
    } catch (error) {
        console.log("Error: ", error);
    }
}

//Quiz

export const createQuiz = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file found" });
        }

        const filePath = req.file.path;

        const { importId } = await seedQuiz(filePath);

        const { courseId } = req.params;
        const { title, shuffleQuestions, marks, dueAt } = req.body;

        const dueDate = new Date(dueAt);

        const questions = await lmsQuestion.find({ importId: importId }).sort({ seq: 1 }).select('_id').lean();

        const questionIds = questions.map(q => q._id);

        const quiz = await lmsQuiz.create({
            importId,
            title,
            shuffleQuestions,
            course: courseId,
            questions: questionIds,
            marks,
            dueAt: dueDate
        });

        res.status(201).json({ message: "Quiz created successfully!", quiz });
    } catch (err) {
        console.error("Error creating quiz:", err);
        res.status(500).json({ message: "Failed to create quiz", error: err.message });
    }
};

export const deleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;

        const quiz = await lmsQuiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        const importId = quiz.importId;

        await lmsAttempt.deleteMany({ quiz: quiz._id });
        await lmsQuestion.deleteMany({ importId });
        await lmsQuiz.findByIdAndDelete(quiz._id);

        res.status(200).json({ message: "Quiz deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: "Failed to delete quiz", error: err.message });
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


export const getQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;

        const quiz = await lmsQuiz.findById(quizId).populate({
            path: "questions",
            options: { sort: { 'type': 1 } }
        });

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
    }
}

export const getAllCourses = async (req, res) => {
    try {
        const facultyId = req.user._id;

        if (!facultyId) {
            return res.json({ message: "User not authenticated" });
        }

        const coursesTeaching = await Course.find({ _id: { $in: req.user.coursesTeaching } });
        res.json({ message: coursesTeaching });
    } catch (error) {
        console.log("Error: ", error);
    }
}