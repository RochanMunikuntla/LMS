import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        reqiured: true
    },
    courseId: {
        type: String,
        required: true
    },
    dueDate: {
        type: String
    },
    description: {
       type: String,
       required: true
    },
    grade: {
        type: String,
        default: null
    }
});

const Assignment = new mongoose.model("Assignement", assignmentSchema);
export default Assignment;