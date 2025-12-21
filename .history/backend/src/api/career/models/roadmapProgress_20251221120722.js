import mongoose from "mongoose";

const roadmapProgressSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
        index: true
    },
    roadmap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap",
        required: true,
        index: true
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true,
        index: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
        index: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    codeAttempts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TopicCodeSubmission"
    }]

})

const RoadmapProgress = mongoose.model("RoadmapProgress", roadmapProgressSchema);

roadmapProgressSchema.index({ student: 1, topic: 1 }, { unique: true });
roadmapProgressSchema.index({ student: 1, roadmap: 1 });
roadmapProgressSchema.index({ student: 1, module: 1 });

export default RoadmapProgress;