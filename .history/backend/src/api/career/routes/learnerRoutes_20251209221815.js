import express from "express"
import { home, enrollRoadmap, derollRoadmap, getAllTopics, getAllModules, getTopic, profile, createProjectCollab, getAllProjectCollab, getProjectCollab, editProjectCollab, addTagToProjectCollab, removeTagFromProject } from "../controllers/learnerControllers.js";

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
router.get("/roadmap/:roadmapId/module/:moduleId", getAllTopics) //Fetches all the topics when you click on the module
router.get("/roadmap/:roadmapId/module/:moduleId/topic/:topicId", getTopic); //Learning page for the user, contains content on the left and Code editor on the right

//Project Collaboration
router.get("/projecthub/:projecthubId", getProjectCollab);
router.get("/projecthub", getAllProjectCollab);
router.post("/projecthub", createProjectCollab);
router.put("/projecthub/:projecthubId", editProjectCollab);
router.put("/projecthub/:projecthubId", addTagToProjectCollab);
router.delete("/projecthub/:projecthubId", removeTagFromProject);
router.delete("/projecthub")



export default router;