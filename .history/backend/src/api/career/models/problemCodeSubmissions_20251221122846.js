import mongoose from "mongoose";

const problemCodeSubmissionSchema = new mongoose.Schema({
    problemId: {
        type
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    languageId: {
        type: String,
        required: true
    },
    sourceCode: {
        type: String,
        required: true
    },
    verdict: {
        type: String,
        required: true
    },
    userMaxTimeComplexity: {
        type: Number
    },
    userMinTimeComplexity: {
        type: Number
    },
    userMaxSpaceComplexity: {
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