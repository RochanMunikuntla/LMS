import express from "express";
import { home, profile, login, authStudent, getAllTasks, addTask, editTask, deleteTask, getTask, getAllAnnouncements, getAnnouncement, submitQuiz } from "../../lms/controllers/studentControllers.js";
import { requireLogin } from "../../../middleware/authMiddleware.js";


const router = express.Router();

router.get("/login", login);
router.post("/login", authStudent);

router.get("/home", requireLogin, home);

router.get("/profile", requireLogin, profile);

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTask);
router.post("/tasks", addTask);
router.put("/tasks/:id", editTask);
router.delete("/tasks/:id", deleteTask);

router.get("/announcements", getAllAnnouncements);
router.get("/announcements/:id", getAnnouncement);

router.post("/courses/quiz/submit", submitQuiz);



export default router;