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
    dueAt: {
        type: String
    },
    description: {
       type: String,
       required: true
    },
    marks: {
        type: String,
        default: null
    }
});

const Assignment = mongoose.model("Assignement", assignmentSchema);
export default Assignment;