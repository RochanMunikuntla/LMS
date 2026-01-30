import express from "express";
import instructorRoutes from "./instructorRoutes.js";
import learnerRoutes from "./learnerRoutes.js";

const router = express.Router();

router.use("/instructor", instructorRoutes);
router.use("/learner", learnerRoutes);

export default router;