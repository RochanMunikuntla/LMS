import bcrypt from "bcryptjs";
import XLSX from "xlsx";
import { Admin } from "../models/user.js";
import { Faculty } from "../models/user.js";
import { Student } from "../models/user.js";
import Course from "../models/course.js";
import Department from "../models/department.js";
import Announcement from "../models/announcement.js";
import { Internship } from "../models/opportunities.js";
import { Job } from "../models/opportunities.js";

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
        res.json({ message: "Created Department" });
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const editDept = async (req, res) => {
    try {
        const deptId = req.params.id;
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
        res.json({ message: "Updated Department" });
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const removeDept = async (req, res) => {
    try {
        const deptId = req.params.id;

        const dept = await Department.findById(deptId);
        if (!dept) {
            return res.status(404).json({ message: "Department not found" });
        }

        await Department.deleteOne({ _id: deptId });
        res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Course

export const createCourse = async (req, res) => {
    try {
        const { courseId, courseName, department, credits } = req.body;
        const existingCourse = await Course.findOne({ courseId });
        if (existingCourse) {
            return res.status(400).json({ message: "Course already exists" });
        }
        const dept = await Department.findOne({ name: department });
        if (!dept) {
            return res.status(400).json({ message: "Department does not exist" });
        }
        const course = new Course({ courseId, courseName, department: dept._id, credits });
        await course.save();
        res.json({ message: "Course created!", course })
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const editCourse = async (req, res) => {
    try {
        const { courseId, courseName, department, credits } = req.body;
        const course = await Course.findOne({ courseId });
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
        const { courseId } = req.body;
        const course = await Course.findOne({ courseId });
        if (!course) {
            return res.status(400).json({ message: "Course does not exist" });
        }
        await Course.deleteOne({ courseId });
        res.json({ message: "Course Deleted!" });
    } catch (error) {
        console.log("Error: ", error);
    }
};

//Student

export const addStudent = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });
        const { defaultPassword } = req.body;

        if (!defaultPassword) {
            return res.status(400).json({ message: "Default password is required" });
        }

        const hashedPassword = await bcrypt.hash(defaultPassword, 12);

        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: true });

        if (!rows.length) return res.status(400).json({ message: "Excel file is empty" });

        const deptNames = [...new Set(rows.map(r => r.department))];
        const departments = await Department.find({ name: { $in: deptNames } });
        const deptMap = {};
        departments.forEach(d => { deptMap[d.name] = d._id; });

        const studentsToInsert = [];
        const departmentUpdates = {};

        for (const row of rows) {
            const { studentId, name, email, role, department, year } = row;
            const deptId = deptMap[department];

            if (!deptId) {
                console.warn(`Department not found: ${department}, skipping student ${studentId}`);
                continue;
            }

            studentsToInsert.push({
                updateOne: {
                    filter: { studentId: String(studentId) },
                    update: {
                        $set: { name, email, role, department: deptId, year, password: hashedPassword }
                    },
                    upsert: true
                }
            });

            if (!departmentUpdates[deptId]) departmentUpdates[deptId] = [];
            departmentUpdates[deptId].push(String(studentId));
        }

        await Student.bulkWrite(studentsToInsert);

        for (const [deptId, studentIds] of Object.entries(departmentUpdates)) {
            const students = await Student.find({ studentId: { $in: studentIds } });
            const studentObjectIds = students.map(s => s._id);

            await Department.updateOne(
                { _id: deptId },
                { $addToSet: { students: { $each: studentObjectIds } } }
            );
        }

        res.status(200).json({ message: "Bulk import successful" });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Bulk import failed", error: error.message });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { studentId, name, department, email } = req.body;
        const student = await Student.findOne({ studentId });
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
        const { studentId } = req.body;
        const student = await Student.find({ studentId });
        if (!student) {
            return res.status(400).json({ message: "Student does not exist" });
        }
        await Student.deleteOne({ studentId });
        res.json({ message: "Student deleted succesfully" });
    } catch (error) {
        console.log("Error: ", error);
    }
};

//Faculty

export const addFaculty = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const { defaultPassword } = req.body;
        if (!defaultPassword) {
            return res.status(400).json({ message: "Default password is required" });
        }

        const hashedPassword = await bcrypt.hash(defaultPassword, 12);

        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: true });

        if (!rows.length) return res.status(400).json({ message: "Excel file is empty" });

        const deptNames = [...new Set(rows.map(r => r.department))];
        const departments = await Department.find({ deptName: { $in: deptNames } });
        const deptMap = {};
        departments.forEach(d => { deptMap[d.deptName] = d._id; });

        const facultyUpsertOps = [];
        const departmentFacultyMap = new Map();
        const allFacultyIds = [];

        for (const row of rows) {
            const { facultyId, name, email, role, department, year } = row;
            const deptId = deptMap[department];

            if (!facultyId || !name || !deptId) {
                console.warn(`Skipping row due to missing department or data: ${facultyId}`);
                continue;
            }

            allFacultyIds.push(facultyId);

            facultyUpsertOps.push({
                updateOne: {
                    filter: { facultyId: String(facultyId) },
                    update: {
                        $set: { name, email, role, department: deptId, year, password: hashedPassword }
                    },
                    upsert: true
                }
            });

            if (!departmentFacultyMap.has(deptId)) departmentFacultyMap.set(deptId, []);
            departmentFacultyMap.get(deptId).push(String(facultyId));
        }

        await Faculty.bulkWrite(facultyUpsertOps);

        const updatedFaculties = await Faculty.find({ facultyId: { $in: allFacultyIds } });
        const facultyIdToObjectIdMap = new Map(updatedFaculties.map(f => [f.facultyId, f._id]));

        const departmentUpdateOps = [];
        for (const [deptId, facultyIds] of departmentFacultyMap.entries()) {
            const facultyObjectIds = facultyIds.map(fid => facultyIdToObjectIdMap.get(fid)).filter(Boolean);
            if (facultyObjectIds.length > 0) {
                departmentUpdateOps.push({
                    updateOne: {
                        filter: { _id: deptId },
                        update: { $addToSet: { faculty: { $each: facultyObjectIds } } }
                    }
                });
            }
        }

        if (departmentUpdateOps.length > 0) await Department.bulkWrite(departmentUpdateOps);

        res.status(200).json({ message: "Bulk import successful." });
    } catch (error) {
        console.error("Bulk import failed:", error);
        res.status(500).json({ message: "Bulk import failed.", error: error.message });
    }
};

export const updateFaculty = async (req, res) => {
    try {
        const { facultyId, name, department, email } = req.body;
        const faculty = await Faculty.findOne({ facultyId });
        if (!faculty) {
            return res.status(400).json({ message: "Faculty does not exist" });
        }
        faculty.name = name || faculty.name;
        faculty.email = email || faculty.email;

        if (department) {
            const dept = await Department.findOne({ name: department });
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
        const { facultyId } = req.body;
        const faculty = await Faculty.find({ facultyId });
        if (!faculty) {
            return res.status(400).json({ message: "Faculty does not exist" });
        }

        await Faculty.deleteOne({ facultyId });
        res.json({ message: "Deleted Faculty" });
    } catch (error) {
        console.log("Error: ", error);
    }
};

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

//Career

//Internship
export const postInternship = async (req, res) => {
    try {
        const { title, company, description, location, stipend, duration } = req.body;
        const internship = new Internship({ title, company, description, location, stipend, duration });
        await internship.save();
        res.json({ message: "Posted Internship" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error: ", error });
    }
}

export const editInternship = async (req, res) => {
    try {
        const { title, company, description, location, stipend, duration } = req.body;
        const internship = await Internship.findById(req.params.id);

        internship.title = title || internship.title;
        internship.company = company || internship.company;
        internship.description = description || internship.description;
        internship.location = location || internship.location;
        internship.stipend = stipend || internship.stipend;
        internship.duration = duration || internship.duration;

        await internship.save();
        res.json({ message: "Updated Internship" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error: ", error });
    }
}

export const deleteInternship = async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);

        if (!internship) {
            return res.json({ message: "No internship found" });
        }

        await internship.deleteOne();
        res.json({ message: "Deleted Internship" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error: ", error });
    }
}

//Job
export const postJob = async (req, res) => {
    try {
        const { title, company, description, location, salary, experience } = req.body;
        const job = new Job({ title, company, description, location, salary, experience });
        await job.save();
        res.json({ message: "Posted Job" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error: ", error });
    }
}

export const editJob = async (req, res) => {
    try {
        const { title, company, description, location, salary, experience } = req.body;
        const job = await Job.findById(req.params.id);

        job.title = title || job.title;
        job.company = company || job.company;
        job.description = description || job.description;
        job.location = location || job.location;
        job.salary = salary || job.salary;
        job.experience = experience || job.experience;

        await job.save();
        res.json({ message: "Updated Job" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error: ", error });
    }
}

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.json({ message: "No job found" });
        }

        await job.deleteOne();
        res.json({ message: "Deleted Job" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error: ", error });
    }
}




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
        const student = await Student.findById(req.params.id);
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
        const faculty = await Faculty.findById(req.params.id);
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
        const course = await Course.findById(req.params.id);
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
        const dept = await Department.findById(req.params.id);
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

export const getAllInternships = async (req, res) => {
    try {
        const internships = await Internship.find();
        res.json({ message: internships });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getInternship = async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);
        res.json({ message: internship })
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json({ message: jobs });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.json({ message: job })
    } catch (error) {
        console.log("Error: ", error);
    }
}