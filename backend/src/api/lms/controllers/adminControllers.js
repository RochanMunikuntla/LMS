import bcrypt from "bcryptjs";
import XLSX from "xlsx";
import { Admin } from "../../auth/models/user.js";
import { Faculty } from "../../auth/models/user.js";
import { Student } from "../../auth/models/user.js";
import Course from "../models/course.js";
import Department from "../models/department.js";
import Announcement from "../models/announcement.js";
import mongoose from "mongoose";

// backend logic controllers


//Admin

export const createAdmin = async (req, res) => {
    try {
        const { adminId, password, name, } = req.body;
        const hash = await bcrypt.hash(password, 12);
        const existingAdmin = await Admin.findOne({ adminId });
        if (existingAdmin) {
            return res.status(400).json({ message: "Id already exists" });
        }
        const admin = new Admin({ adminId, password: hash, name, dob, gender });
        await admin.save();
        res.json({ message: "Created an Admin" });
        res.redirect("/pages/home");
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const authAdmin = async (req, res) => {
    try {
        const { adminId, password } = req.body;
        const admin = await Admin.findOne({ adminId });
        if (!Admin) {
            return res.status(400).json({ message: "Invalid Id or password" });
        }
        const isValidPassword = await bcrypt.compare(password, admin.password);
        req.session.user = {
            id: admin._id,
            adminId: admin.adminId,
            name: admin.name,
            role: "admin"
        };
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid Id or password" });
        }
        res.json({ message: "Logged in as Admin" });
        res.redirect("/pages/home");
    } catch (error) {
        console.log("Error: ", error);
    }
};

//Department

export const createDept = async (req, res) => {
    try {
        const { deptId, deptName, email } = req.body;
        const exisitingDept = await Department.findOne({ deptId })
        if (exisitingDept) {
            return res.status(400).json({ message: "Department already exists" });
        }
        const dept = new Department({ deptId, deptName, email });
        await dept.save();
        res.json({ message: "Created Department", dept });
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const editDept = async (req, res) => {
    try {
        const { deptId } = req.params;
        const { name, email, HoD } = req.body;
        const dept = await Department.findById(deptId);
        if (!dept) {
            return res.status(400).json({ message: "Department not found" });
        }
        dept.name = name || dept.name;
        dept.email = email || dept.email;

        if (HoD) {
            const faculty = await Faculty.findOne({ name: HoD });
            if (!faculty) {
                return res.status(400).json({ message: "Faculty does not exist" });
            }
            dept.HoD = faculty._id;
        }
        await dept.save();
        res.json({ message: "Updated Department", dept });
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const removeDept = async (req, res) => {
    try {
        const { deptId } = req.params;
        const deptObjId = new mongoose.Types.ObjectId(deptId);

        const dept = await Department.findById(deptObjId);

        if (!dept) {
            return res.status(404).json({ message: "Department not found" });
        }

        await Student.updateMany({ department: deptObjId }, { $set: { department: null } });
        await Faculty.updateMany({ department: deptObjId }, { $set: { department: null } });
        await Course.updateMany({ department: deptObjId }, { $set: { department: null } });
        await Department.findByIdAndDelete(deptObjId);

        res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


//Course

export const createCourse = async (req, res) => {
    try {
        const { courseId, courseName, deptName, credits } = req.body;

        const existingCourse = await Course.findOne({ courseId });
        if (existingCourse) {
            return res.status(400).json({ message: "Course already exists" });
        }

        const dept = await Department.findOne({ deptName });
        if (!dept) {
            return res.status(400).json({ message: "Department does not exist" });
        }

        const course = new Course({
            courseId,
            courseName,
            department: dept._id,
            credits
        });

        await course.save();
        res.status(201).json({ message: "Course created!", course });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { courseName, department, credits } = req.body;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({ message: "Course does not exist" });
        }
        course.courseName = courseName || course.courseName;
        course.credits = credits || course.credits;

        if (department) {
            const dept = await Department.findOne({ name: department });
            if (!dept) {
                return res.status(400).json({ message: "Department does not exist" });
            }
            course.department = dept._id;
        }
        await course.save();
        res.json({ message: "Course Updated!" })
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const removeCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const deleted = await Course.findByIdAndDelete(courseId);

        if (!deleted) return res.status(404).json({ message: "Course not found" });

        return res.json({ message: "Course deleted", deleted });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};



//Student

export const addStudent = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });
        const { defaultPassword } = req.body;
        if (!defaultPassword) return res.status(400).json({ message: "Default password is required" });

        const hashedPassword = await bcrypt.hash(defaultPassword, 12);

        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: true });
        if (!rows.length) return res.status(400).json({ message: "Excel file is empty" });

        const unmatchedDepartments = new Set();

        for (const row of rows) {
            const { studentId, name, email, role, department, year } = row;

            // Normalize department from Excel
            const normalizedDept = String(department).trim();

            // Find department in DB, case-insensitive
            const deptObj = await Department.findOne({ deptName: { $regex: `^${normalizedDept}$`, $options: "i" } });

            if (!deptObj) {
                console.warn(`Department not found: ${normalizedDept}, skipping student ${studentId}`);
                unmatchedDepartments.add(normalizedDept);
                continue;
            }

            // Upsert student and get the updated document
            const student = await Student.findOneAndUpdate(
                { studentId: String(studentId) },
                {
                    $set: {
                        name,
                        email,
                        role,
                        department: deptObj._id,
                        year,
                        password: hashedPassword
                    }
                },
                { upsert: true, new: true } // `new: true` returns the updated doc
            );

            // Ensure student is added to department using MongoDB ObjectId
            if (!deptObj.students.includes(student._id)) {
                deptObj.students.push(student._id);
                await deptObj.save();
            }
        }

        res.status(200).json({
            message: "Bulk import completed",
            unmatchedDepartments: Array.from(unmatchedDepartments)
        });

    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Bulk import failed", error: error.message });
    }
};


export const updateStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { name, department, email } = req.body;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(400).json({ message: "Student does not exist" });
        }
        student.name = name || student.name;
        student.email = email || student.email;

        if (department) {
            const dept = await Department.findOne({ name: department });
            if (!dept) {
                return res.status(400).json({ message: "Department does not exist" });
            }
            student.department = dept._id;
        }
        await student.save();
        res.status(200).json({ message: "Student updated successfully", student });
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const removeStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const deptId = student.department;

        if (deptId) {
            await Department.updateOne(
                { _id: deptId },
                { $pull: { students: student._id } }
            );
        }

        const deleted = await Student.findByIdAndDelete(studentId);
        if (!deleted) {
            return res.status(500).json({ message: "Failed to delete student" });
        }

        return res.json({ message: "Student deleted successfully" });

    } catch (error) {
        console.error("Error (removeStudent):", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const changeStudentToDept = async (req, res) => {
    try {
        const { newDept } = req.body;
        const { studentId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const currDept = student.department;

        const newDepartment = await Department.findOne({ deptName: newDept });
        if (!newDepartment) {
            return res.status(404).json({ message: "New department not found" });
        }

        // Remove student from current dept
        if (currDept) {
            const oldDept = await Department.findById(currDept);
            if (oldDept) {
                oldDept.students.pull(student._id);
                await oldDept.save();
            }
        }

        // Update student
        student.department = newDepartment._id;
        await student.save();

        // Add student to new department
        if (!newDepartment.students.includes(student._id)) {
            newDepartment.students.push(student._id);
            await newDepartment.save();
        }

        res.json({ message: "Changed student dept successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const addStudentToCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const { studentId } = req.params;

        const course = await Course.findById(courseId);
        const student = await Student.findById(studentId);

        if (!course || !student) {
            res.status(404).json({ message: "Student or Course not found" });
        }
        //Adds student to course
        if (!course.studentsEnrolled.includes(studentId)) {
            course.studentsEnrolled.push(studentId);
            await course.save();
        }
        //Updates student's course list
        if (!student.coursesEnrolled.includes(courseId)) {
            student.coursesEnrolled.push(courseId);
            await student.save();
        }
        res.status(200).json({ message: "Added student to course" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removeStudentFromCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const { studentId } = req.params;

        const course = await Course.findById(courseId);
        const student = await Student.findById(studentId);

        if (!course || !student) {
            res.status(404).json({ message: "Course or Student not found" });
        }

        //Removes student from course
        course.studentsEnrolled.pull(studentId);
        await course.save();


        //Removes course from student's course list
        student.coursesEnrolled.pull(courseId);
        await student.save();

        res.status(200).json({ message: "Removed student from course" });
    } catch (error) {
        console.log("Error: ", error);
    }
}


//Faculty

export const addFaculty = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });
        const { defaultPassword } = req.body;
        if (!defaultPassword) return res.status(400).json({ message: "Default password is required" });

        const hashedPassword = await bcrypt.hash(defaultPassword, 12);

        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: true });
        if (!rows.length) return res.status(400).json({ message: "Excel file is empty" });

        const unmatchedDepartments = new Set();

        for (const row of rows) {
            const { facultyId, name, email, role, department } = row;

            // Normalize department from Excel
            const normalizedDept = String(department).trim();

            // Find department in DB, case-insensitive
            const deptObj = await Department.findOne({ deptName: { $regex: `^${normalizedDept}$`, $options: "i" } });

            if (!deptObj) {
                console.warn(`Department not found: ${normalizedDept}, skipping faculty ${facultyId}`);
                unmatchedDepartments.add(normalizedDept);
                continue;
            }

            // Upsert student and get the updated document
            const faculty = await Faculty.findOneAndUpdate(
                { facultyId: String(facultyId) },
                {
                    $set: {
                        name,
                        email,
                        role,
                        department: deptObj._id,
                        password: hashedPassword
                    }
                },
                { upsert: true, new: true } // `new: true` returns the updated doc
            );

            // Ensure student is added to department using MongoDB ObjectId
            if (!deptObj.faculty.includes(faculty._id)) {
                deptObj.faculty.push(faculty._id);
                await deptObj.save();
            }
        }

        res.status(200).json({
            message: "Bulk import completed",
            unmatchedDepartments: Array.from(unmatchedDepartments)
        });

    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Bulk import failed", error: error.message });
    }
};

export const changeFacultyToDept = async (req, res) => {
    try {
        const { newDept } = req.body;
        const { facultyId } = req.params;

        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }

        const currDept = faculty.department;

        const newDepartment = await Department.findOne({ deptName: newDept });
        if (!newDepartment) {
            return res.status(404).json({ message: "New department not found" });
        }

        // Remove student from current dept
        if (currDept) {
            const oldDept = await Department.findById(currDept);
            if (oldDept) {
                oldDept.faculty.pull(faculty._id);
                await oldDept.save();
            }
        }

        // Update student
        faculty.department = newDepartment._id;
        await faculty.save();

        // Add student to new department
        if (!newDepartment.faculty.includes(faculty._id)) {
            newDepartment.faculty.push(faculty._id);
            await newDepartment.save();
        }

        res.json({ message: "Changed faculty dept successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateFaculty = async (req, res) => {
    try {
        const { facultyId } = req.params;
        const { name, department, email } = req.body;

        const faculty = await Faculty.findById(facultyId);

        if (!faculty) {
            return res.status(400).json({ message: "Faculty does not exist" });
        }

        faculty.name = name || faculty.name;
        faculty.email = email || faculty.email;

        if (department) {
            const dept = await Department.findOne({ department: department });
            if (!dept) {
                return res.status(400).json({ message: "Department does not exist" });
            }
            faculty.department = dept._id;
        }

        await faculty.save();
        res.json({ message: "Updated faculty!" })
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const removeFaculty = async (req, res) => {
    try {
        const { facultyId } = req.params;

        const faculty = await Faculty.findById(facultyId);

        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }

        const deptId = faculty.department;

        if (deptId) {
            await Department.updateOne(
                { _id: deptId },
                { $pull: { faculty: faculty._id } }
            );
        }

        const fid = faculty._id;

        await Course.updateMany(
            { _id: fid },
            { $pull: { faculty: fid } }
        );


        const deleted = await Faculty.findByIdAndDelete(facultyId);

        if (!deleted) {
            return res.status(500).json({ message: "Failed to delete faculty" });
        }

        return res.json({ message: "Faculty deleted successfully" });
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const addFacultyToCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const { facultyId } = req.params;

        const course = await Course.findById(courseId);
        const faculty = await Faculty.findById(facultyId);

        if (!course || !faculty) {
            res.status(404).json({ message: "Faculty or Course not found" });
        }
        //Adds faculty to course
        if (!course.faculty.includes(facultyId)) {
            course.faculty.push(facultyId);
            await course.save();
        }
        //Updates faculty's course list
        if (!faculty.coursesTeaching.includes(courseId)) {
            faculty.coursesTeaching.push(courseId);
            await faculty.save();
        }
        res.status(200).json({ message: "Added faculty to course" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removeFacultyFromCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const { facultyId } = req.params;

        const cid = await Course.findById(courseId);
        const fid = await Faculty.findById(facultyId);

        if (!cid || !fid) {
            return res.status(404).json({ message: "Course or Faculty not found" });
        }

        //Removes faculty from course
        cid.faculty.pull(fid);
        await cid.save();


        //Removes course from faculty's course list
        fid.coursesTeaching.pull(cid);
        await fid.save();

        res.status(200).json({ message: "Removed faculty from course" });
    } catch (error) {
        console.log("Error: ", error);
    }
}

//Announcement

export const postAnnouncement = async (req, res) => {
    try {
        const { title, description } = req.body;
        const announcement = new Announcement({ title, description });
        await announcement.save();
        res.json({ message: "Announcement posted", announcement });
    } catch (error) {
        console.error("Error posting announcement:", error);
        res.status(500).json({ message: "Failed to post announcement", error: error.message });
    }
};

export const editAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const announcement = await Announcement.findById(id);
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        if (title) announcement.title = title;
        if (description) announcement.description = description;

        await announcement.save();
        res.json({ message: "Announcement updated", announcement });
    } catch (error) {
        console.error("Error editing announcement:", error);
        res.status(500).json({ message: "Failed to update announcement", error: error.message });
    }
};

export const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;

        const announcement = await Announcement.findById(id);
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        await announcement.deleteOne();
        res.json({ message: "Announcement deleted" });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        res.status(500).json({ message: "Failed to delete announcement", error: error.message });
    }
};



// frontend rendering controllers

export const home = (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const login = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const profile = (req, res) => {
    try {
        res.render("profile");
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json({ message: students });
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const getStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId);
        res.json({ message: student });
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const getAllFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find();
        res.json({ message: faculty });
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const getFaculty = async (req, res) => {
    try {
        const { facultyId } = req.params;
        const faculty = await Faculty.findById(facultyId);
        res.json({ message: faculty });
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ message: courses })
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const getCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        res.json({ message: course });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getAllDept = async (req, res) => {
    try {
        const dept = await Department.find();
        res.json({ message: dept });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getDept = async (req, res) => {
    try {
        const { deptId } = req.params;
        const dept = await Department.findById(deptId);
        res.json({ message: dept });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.json({ message: announcements });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        res.json({ message: announcement });
    } catch (error) {
        console.log("Error: ", error);
    }
}

