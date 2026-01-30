import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        reqiured: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    dueDate: {
        type: String
    },
    description: {
       type: String,
       required: true
    },
    marks: {
        type: Number,
        required: true
    }
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;