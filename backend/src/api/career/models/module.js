import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    },
    roadmap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap",
        requried: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"
    }],
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "careerQuiz"
    }
}, { timestamps: true });

moduleSchema.index({ roadmap: 1, index: 1 });

const Module = mongoose.model("Module", moduleSchema);

export default Module;