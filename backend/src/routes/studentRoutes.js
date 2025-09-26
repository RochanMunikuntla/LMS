import express from "express";
import { home, profile, login, authStudent } from "../controllers/studentControllers.js";
import { requireLogin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/login", login);
router.post("/login", authStudent);

router.get("/home", requireLogin,home);

router.get("/profile",requireLogin ,profile);

export default router;