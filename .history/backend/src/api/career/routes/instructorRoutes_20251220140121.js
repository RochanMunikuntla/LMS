import express from "express"
import { addCodingQuestions, addLanguage, addProblemCounter, createModule, createQuiz, createRoadmap, createTopic, deleteRoadmap } from "../controllers/instructorControllers.js";
import upload from "../../../middleware/fileMiddleware.js";

const router = express.Router();

//Roadmap
router.post("/roadmaps", createRoadmap);
router.delete("/roadmaps/:roadmapId", deleteRoadmap);

//Module
router.post("/roadmaps/:roadmapId/modules", createModule);
router.post("/:roadmapId/:moduleId/quiz", upload.single("file"), createQuiz);

//Topic
router.post("/roadmaps/:roadmapId/:moduleId/topics", createTopic);

//Coding
router.post("/coding/language", addLanguage);
router.post("/coding/problems", upload.single("file"), addCodingQuestions);
router.post("/coding/problems/counter", addProblemCounter);

export default router;