import express from "express"
import { createModule, createQuiz, createRoadmap, createTopic, deleteRoadmap } from "../controllers/instructorControllers.js";

const router = express.Router();

//Roadmap
router.post("/roadmaps", createRoadmap);
router.delete("/roadmaps/:roadmapId", deleteRoadmap);

//Module
router.post("/roadmaps/:roadmapId/modules", createModule);
router.post("/:roadmapId/:moduleId", createQuiz)

//Topic
router.post("/roadmaps/:roadmapId/:moduleId/topics", createTopic);

export default router;