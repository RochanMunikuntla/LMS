import express from "express";
import { home, profile, createAdmin, login, authAdmin, addStudent, addFaculty, updateStudent, updateFaculty, removeStudent, removeFaculty, createCourse, editCourse, removeCourse, getAllStudents, getStudent, getAllFaculty, getFaculty, getCourse, getAllCourses, createDept, editDept, getAllDept, getDept, removeDept, changeStudentToDept, addStudentToCourse, removeStudentFromCourse, removeFacultyFromCourse, changeFacultyToDept, addFacultyToCourse, deleteAnnouncement, editAnnouncement, getAllAnnouncements, getAnnouncement, postAnnouncement } from "../../lms/controllers/adminControllers.js";
import { requireLogin } from "../../../middleware/authMiddleware.js";
import upload from "../../../middleware/fileMiddleware.js";
import { requireRole } from "../../../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/signup", createAdmin);

router.get("/login", login);
router.post("/login", authAdmin);

router.get("/home", requireLogin, requireRole("admin"), home);

router.get("/profile", requireLogin, requireRole("admin"), profile);

//Student(done)
router.get("/students", getAllStudents);
router.get("/students/:studentId", getStudent);
router.post("/students", upload.single('file'), addStudent);
router.post("/students/:studentId/courses", addStudentToCourse);
router.put("/students/:studentId", updateStudent);
router.put("/students/:studentId/department", changeStudentToDept);
router.delete("/students/:studentId", removeStudent);
router.delete("/students/:studentId/courses", removeStudentFromCourse);

//Faculty(done)
router.get("/faculty", getAllFaculty);
router.get("/faculty/:facultyId", getFaculty);
router.post("/faculty", upload.single('file'), addFaculty);
router.post("/faculty/:facultyId/courses", addFacultyToCourse);
router.put("/faculty/:facultyId", updateFaculty);
router.put("/faculty/:facultyId/department", changeFacultyToDept);
router.delete("/faculty/:facultyId", removeFaculty);
router.delete("/faculty/:facultyId/courses", removeFacultyFromCourse);

//Course(done)
router.get("/courses", getAllCourses);
router.get("/courses/:courseId", getCourse);
router.post("/courses", createCourse);
router.put("/courses/:courseId", editCourse);
router.delete("/courses/:courseId", removeCourse);

//Department(done)
router.get("/departments", getAllDept);
router.get("/departments/:deptId", getDept);
router.post("/departments", createDept);
router.put("/departments/:deptId", editDept);
router.delete("/departments/:deptId", removeDept);

//Announcement()
router.get("/announcements", getAllAnnouncements);
router.get("/announcements/:announcementId", getAnnouncement);
router.post("/announcements", postAnnouncement);
router.put("/announcements/:announcementId", editAnnouncement);
router.delete("/announcements/:announcementId", deleteAnnouncement);

export default router;