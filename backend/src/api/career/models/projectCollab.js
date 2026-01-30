import mongoose from "mongoose";

const projectCollabSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    collaborators: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        role: { type: String, enum: ["member", "mentor"], default: "member" },
        joinedAt: { type: Date, default: Date.now }
    }],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags"
    }],
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    status: {
        type: String,
        enum: ["open", "in-progress", "closed"],
        default: "open"
    }
}, { timestamps: true });

projectCollabSchema.index({ title: "text", description: "text" });


const ProjectCollab = mongoose.model("ProjectCollab", projectCollabSchema);

export default ProjectCollab;