import express from "express";
import { home, profile, createAdmin, login, authAdmin, addStudent, addFaculty, updateStudent, updateFaculty, removeStudent, removeFaculty, createCourse, editCourse, removeCourse, getAllStudents, getStudent, getAllFaculty, getFaculty, getCourse, getAllCourses, createDept, editDept, getAllDept, getDept, removeDept } from "../controllers/adminControllers.js";
import { requireLogin } from "../middleware/authMiddleware.js";
import upload from "../middleware/fileMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";
import { deleteAnnouncement, editAnnouncement, getAllAnnouncements, getAnnouncement, postAnnouncement } from "../controllers/adminControllers.js";

const router = express.Router();

router.post("/signup", createAdmin);

router.get("/login", login);
router.post("/login", authAdmin);

router.get("/home", requireLogin, requireRole("admin"), home);

router.get("/profile", requireLogin, requireRole("admin"), profile);

//Student(done)
router.get("/students", getAllStudents);
router.get("/students/:id", getStudent);
router.post("/students", upload.single('file'), addStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", removeStudent);

//Faculty(done)
router.get("/faculty", getAllFaculty);
router.get("/faculty/:id", getFaculty);
router.post("/faculty", upload.single('file'), addFaculty);
router.put("/faculty/:id", updateFaculty);
router.delete("/faculty/:id", removeFaculty);

//Course(done)
router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourse);
router.post("/courses", createCourse);
router.put("/courses/:id", editCourse);
router.delete("/courses/:id", removeCourse);

//Department(done)
router.get("/departments", getAllDept);
router.get("/departments/:id", getDept);
router.post("/departments", createDept);
router.put("/departments/:id", editDept);
router.delete("/departments/:id", removeDept);

//Announcement(done)
router.get("/announcements", getAllAnnouncements);
router.get("/announcements/:id", getAnnouncement);
router.post("/announcements", postAnnouncement);
router.put("/announcements/:id", editAnnouncement);
router.delete("/announcements/:id", deleteAnnouncement);

export default router;