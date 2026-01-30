import express from "express";
import { home, profile, login, authFaculty, getAllAssignments, createAssignment, editAssignment, removeAssignment, getAssignment, createQuiz, getQuiz, getAllAnnouncements, getAnnouncement, getAllMaterials, getMaterial, postMaterials, editMaterials, deleteMaterials, getAllCourses, deleteQuiz } from "../../lms/controllers/facultyControllers.js";
import { requireLogin } from "../../../middleware/authMiddleware.js";
import upload from "../../../middleware/fileMiddleware.js";

const router = express.Router();


router.post("/login", authFaculty);

router.get("/home", home);

router.get("/profile", profile);

//Courses
router.get("/courses", getAllCourses);

//Assignments(done)
router.get("/courses/:courseId/assignments", getAllAssignments);
router.get("/courses/:courseId/assignments/:assignmentId", getAssignment);
router.post("/courses/:courseId/assignments", createAssignment);
router.put("/courses/:courseId/assignments/:assignmentId", editAssignment);
router.delete("/courses/:courseId/assignments/:assignmentId", removeAssignment);

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