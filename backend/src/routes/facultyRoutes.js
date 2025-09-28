import express from "express";
import { home, profile, login, authFaculty, getAllAssignments, createAssignment, editAssignment, removeAssignment, getAssignment, uploadQuestions, createQuiz, deleteQuestions, submitQuiz, getQuiz, getQues, getAllAnnouncements, getAnnouncement } from "../controllers/facultyControllers.js";
import { requireLogin } from "../middleware/authMiddleware.js";
import upload from "../middleware/fileMiddleware.js";

const router = express.Router();

router.get("/login", login);
router.post("/login", authFaculty);

router.get("/home", requireLogin, home);

router.get("/profile", requireLogin, profile);

router.get("/assignments", getAllAssignments);
router.get("/assignment/:id", getAssignment)
router.post("/assignments", createAssignment);
router.put("/assignments/:id", editAssignment);
router.delete("/assignments/:id", removeAssignment);

router.get("/getQues/:id", getQues);
router.post("/uploadQues", upload.single("file"), uploadQuestions);
router.post("/deleteQues", deleteQuestions);

router.get("/quiz/:id", getQuiz);
router.post("/quiz/create", createQuiz);
router.post("/quiz/submit", submitQuiz);

router.get("/announcements", getAllAnnouncements);
router.get("/announcements/:id", getAnnouncement);

export default router;