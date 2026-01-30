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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        default: null,
        required: true
    },
    faculty: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Faculty",
        default: null
    }],
    studentsEnrolled: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student" ,
        default: null
    }]
}, {timestamps: true});

const Course = mongoose.model("Course", courseSchema);
export default Course;