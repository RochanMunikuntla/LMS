import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    deptId: {
        type: String,
        required: true
    },
    name: {
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
    }]
});

const Department = mongoose.model("Department", departmentSchema)
export default Department;