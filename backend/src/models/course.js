import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    credits: {
        type: Number,
        default: null
    },
    department: {
        type: String,
        default: null
    },
    faculty: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Faculty",
        default: null
    },
    studentsEnrolled: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student" 
    }]
}, {timestamps: true});

const Course = mongoose.model("Course", courseSchema);
export default Course;