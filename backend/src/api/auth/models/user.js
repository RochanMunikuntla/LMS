import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});

export const User = mongoose.model("User", userSchema);

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [10, "Username must be 10 characters long"],
        maxlength: [10, "Username must be 10 characters long"]
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Department",
        required: true
    },
    admissionYear: { 
        type: Number
    },
    currentSemester: {
        type: Number,
        default: 1
    },
    coursesEnrolled: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course"
    }],
    roadmaps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap"
    }],
    attendance: [{ 
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        totalClasses: { type: Number, default: 0 },
        attended: { type: Number, default: 0 }
    }]
});

const facultySchema = new mongoose.Schema({
    facultyId: {
        type: String,
        required: true
    },
    coursesTeaching: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course" 
    }],
    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Department",
        required: true
    }
});

const adminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

export const Student = User.discriminator("Student", studentSchema);
export const Faculty = User.discriminator("Faculty", facultySchema);
export const Admin = User.discriminator("Admin", adminSchema);
