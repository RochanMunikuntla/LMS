import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    deptId: {
        type: String,
        required: true
    },
    deptName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    }],
    faculty: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses"
    }],
    HoD: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    }
});

const Department = mongoose.model("Department", departmentSchema)
export default Department;