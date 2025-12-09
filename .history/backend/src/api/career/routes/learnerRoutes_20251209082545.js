import express from "express"
import { home, enrollRoadmap, derollRoadmap, getAllTopics, getAllModules, getTopic, profile, createProjectCollab } from "../controllers/learnerControllers.js";

const router = express.Router();

//Personal
router.get("/home", home);
router.get("/profile", profile); //(work in progress)

//Roadmap
router.post("/roadmap/:roadmapId", enrollRoadmap);
router.delete("/roadmap/:roadmapId", derollRoadmap);

//Modules
router.get("/roadmap/:roadmapId", getAllModules);

//Topics
router.get("/:roadmapId/:moduleId", getAllTopics) //Fetches all the topics when you click on the module
router.get("/:roadmapId/:moduleId/:topicId", getTopic); //Learning page for the user, contains content on the left and Code editor on the right

//Project Collaboration
router.get("/propjecthub", getAll)
router.post("/projecthub", createProjectCollab);



export default router;