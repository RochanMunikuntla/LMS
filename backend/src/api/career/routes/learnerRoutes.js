import express from "express"
import { home, enrollRoadmap, derollRoadmap, getAllTopics, getAllModules, getTopic, profile, createProjectCollab, getAllProjectCollab, getProjectCollab, editProjectCollab, addTagToProjectCollab, removeTagFromProject, deleteProjectCollab, filterProjectCollab, likeProjectCollab, unlikeProjectCollab, searchProjectCollab, autocompleteProjectCollab, runCodeForTopic, submitCodeToTopic, runCodeForProblem, submitCodeToProblem, getAllProblems, getProblem, listLanguages, getAllTopicSubmissions, getTopicSubmission, getAllProblemSubmissions, getProblemSubmission } from "../controllers/learnerControllers.js";

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
router.get("/roadmap/:roadmapId/module/:moduleId/topic/:topicId/submissions", getAllTopicSubmissions);
router.get("/roadmap/:roadmapId/module/:moduleId/topic/:topicId/submissions/:submissionId", getTopicSubmission);
router.post("/roadmap/:roadmapId/module/:moduleId/topic/:topicId/run", runCodeForTopic);
router.post("/roadmap/:roadmapId/module/:moduleId/topic/:topicId/submit", submitCodeToTopic);

//Project Collaboration
router.get("/projecthub/search", searchProjectCollab);
router.get("/projecthub/autocomplete", autocompleteProjectCollab);
router.post("/projecthub/like", likeProjectCollab);
router.delete("/projecthub/unlike", unlikeProjectCollab);
router.get("/projecthub/filter", filterProjectCollab);

router.get("/projecthub/:projecthubId", getProjectCollab);
router.get("/projecthub", getAllProjectCollab);
router.post("/projecthub", createProjectCollab);
router.put("/projecthub/:projecthubId", editProjectCollab);
router.delete("/projecthub/:projecthubId", deleteProjectCollab);

router.post("/projecthub/:projecthubId/tags", addTagToProjectCollab);
router.delete("/projecthub/:projecthubId/tags", removeTagFromProject);

//Coding
router.get("/coding/problems", getAllProblems);
router.get("/coding/problems/:problemId", getProblem);
router.get("/coding/problems/:problemId/submissions", getAllProblemSubmissions);
router.get("/coding/problems/:problemId/submissions/:submissionId", getProblemSubmission);
router.post("/coding/problems/:problemId/run", runCodeForProblem);
router.post("/coding/problems/:problemId/submit", submitCodeToProblem);
router.get("/getLanguages", listLanguages);

export default router;

