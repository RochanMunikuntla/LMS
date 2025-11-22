import express from "express";
import { home, profile, login, authFaculty, getAllAssignments, createAssignment, editAssignment, removeAssignment, getAssignment, uploadQuestions, createQuiz, deleteQuestions, submitQuiz, getQuiz, getQues, getAllAnnouncements, getAnnouncement, getAllMaterials, getMaterial, postMaterials, editMaterials, deleteMaterials, getAllCourses } from "../controllers/facultyControllers.js";
import { requireLogin } from "../middleware/authMiddleware.js";
import upload from "../middleware/fileMiddleware.js";

const router = express.Router();

router.get("/login", login);
router.post("/login", authFaculty);

router.get("/home", requireLogin, home);

router.get("/profile", requireLogin, profile);

//Assignments(done)
router.get("/assignments", getAllAssignments);
router.get("/assignment/:id", getAssignment)
router.post("/assignments", createAssignment);
router.put("/assignments/:id", editAssignment);
router.delete("/assignments/:id", removeAssignment);

//Questions(done)
router.get("/getQues/:id", getQues);
router.post("/uploadQues", upload.single("file"), uploadQuestions);
router.post("/deleteQues", deleteQuestions);

//Quiz(done)
router.get("/quiz/:id", getQuiz);
router.post("/quiz/create", createQuiz);
router.post("/quiz/submit", submitQuiz);

//Announcements(done)
router.get("/announcements", getAllAnnouncements);
router.get("/announcements/:id", getAnnouncement);

//Courses
router.get("/courses", getAllCourses);

//Materials(testing pending)
router.get("/course/:courseId/materials", getAllMaterials);
router.get("/course/:courseId/materials/:materialId", getMaterial);
router.post("/course/:courseId/materials", postMaterials);
router.put("/course/:courseId/materials/:materialId", editMaterials);
router.delete("/course/:courseId/materials/:materialId", deleteMaterials);




export default router;