import express from "express";
import { home, profile, createAdmin, login, authAdmin, addStudent, addFaculty, updateStudent, updateFaculty, removeStudent, removeFaculty, createCourse, editCourse, removeCourse, getAllStudents, getStudent, getAllFaculty, getFaculty, getCourse, getAllCourses, createDept } from "../controllers/adminControllers.js";
import { requireLogin } from "../middleware/authMiddleware.js";
import upload from "../middleware/fileMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

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

//Department(working)
router.post("/departments", createDept);

export default router;