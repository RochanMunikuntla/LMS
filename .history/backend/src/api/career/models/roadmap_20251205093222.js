import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
    slug: {
        type: String,
        requried: true
    },
    title: {
        type: String,
        requried: true
    },
    description: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        requried: true
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner"
    },
    modules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module"
    }],
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "careerQuiz"
    }
}, { timestamps: true });

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;