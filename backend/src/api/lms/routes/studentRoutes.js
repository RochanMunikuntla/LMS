import express from "express";
import { authStudent, getAllTasks, addTask, editTask, deleteTask, getTask, getAllAnnouncements, getAnnouncement, submitQuiz, reviewQuiz, getAttempts, getQuiz, dueDates } from "../../lms/controllers/studentControllers.js";
import { requireLogin } from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authStudent);

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTask);
router.post("/tasks", addTask);
router.put("/tasks/:id", editTask);
router.delete("/tasks/:id", deleteTask);

router.get("/announcements", getAllAnnouncements);
router.get("/announcements/:id", getAnnouncement);

router.post("/courses/:courseId/quiz/:quizId/submit", submitQuiz);
router.get("/courses/:courseId/quiz/:quizId", getQuiz);
router.get("/courses/:courseId/quiz/:quizId/review", getAttempts);
router.get("/courses/:courseId/quiz/:quizId/review/:reviewId", reviewQuiz);

router.get("/dashboard", dueDates);

export default router;