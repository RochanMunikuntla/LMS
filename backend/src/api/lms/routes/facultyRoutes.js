import express from "express";
import { home, profile, login, authFaculty, getAllAssignments, createAssignment, editAssignment, removeAssignment, getAssignment, createQuiz, getQuiz, getAllAnnouncements, getAnnouncement, getAllMaterials, getMaterial, postMaterials, editMaterials, deleteMaterials, getAllCourses, deleteQuiz } from "../../lms/controllers/facultyControllers.js";
import { requireLogin } from "../../../middleware/authMiddleware.js";
import upload from "../../../middleware/fileMiddleware.js";

const router = express.Router();

router.get("/login", login);
router.post("/login", authFaculty);

router.get("/home", requireLogin, home);

router.get("/profile", requireLogin, profile);

//Courses
router.get("/courses", getAllCourses);

//Assignments(done)
router.get("/courses/assignments", getAllAssignments);
router.get("/courses/assignment/:id", getAssignment)
router.post("/courses/assignments", createAssignment);
router.put("/courses/assignments/:id", editAssignment);
router.delete("/courses/assignments/:id", removeAssignment);

//Quiz(done)
router.get("/courses/:courseId/quiz/:quizId", getQuiz);
router.post("/courses/:courseId/quiz", upload.single("file"), createQuiz);
router.delete("/courses/:courseId/quiz/:quizId", deleteQuiz);

//Announcements()
router.get("/courses/announcements", getAllAnnouncements);
router.get("/courses/announcements/:id", getAnnouncement);


//Materials(testing pending)
router.get("/course/:courseId/materials", getAllMaterials);
router.get("/course/:courseId/materials/:materialId", getMaterial);
router.post("/course/:courseId/materials", postMaterials);
router.put("/course/:courseId/materials/:materialId", editMaterials);
router.delete("/course/:courseId/materials/:materialId", deleteMaterials);




export default router;