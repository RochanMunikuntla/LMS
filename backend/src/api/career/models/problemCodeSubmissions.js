import mongoose from "mongoose";

const problemCodeSubmissionSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodingQuestion"
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    languageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language"
    },
    sourceCode: {
        type: String,
        required: true
    },
    verdict: {
        type: String,
        required: true
    },
    userMaxTimeMs: {
        type: Number
    },
    userMaxMemoryKb: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

problemCodeSubmissionSchema.index({ user: 1, topic: 1, createdAt: -1 });

const ProblemCodeSubmission = mongoose.model("ProblemCodeSubmission", problemCodeSubmissionSchema);

export default ProblemCodeSubmission;