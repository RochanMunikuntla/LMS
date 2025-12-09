import express from "express"
import { createModule, createRoadmap, createTopic, deleteRoadmap } from "../controllers/instructorControllers.js";

const router = express.Router();

//Roadmap
router.post("/roadmaps", createRoadmap);
router.delete("/roadmaps/:roadmapId", deleteRoadmap);

//Module
router.post("/roadmaps/:roadmapId/modules", createModule);
router.post("/:roadmapId"/:)

//Topic
router.post("/roadmaps/:roadmapId/:moduleId/topics", createTopic);

export default router;