import express from "express";
import { home, profile, login, authFaculty, assignments, createAssignment, editAssignment } from "../controllers/facultyControllers.js";
import { requireLogin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/login", login);
router.post("/login", authFaculty);

router.get("/home", requireLogin, home);

router.get("/profile", requireLogin, profile);

router.get("/assignments", requireLogin, assignments);
router.post("/assignments", requireLogin, createAssignment);
router.put("/assignments", requireLogin, editAssignment);
router.put("/assignments", requireLogin, )

export default router;