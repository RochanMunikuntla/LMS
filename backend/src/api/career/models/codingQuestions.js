import mongoose from "mongoose";

const codingQuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    problemId: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inputFormat: {
        type: String,
        required: true
    },
    outputFormat: {
        type: String,
        required: true
    },
    constraints: {
        timeLimitMs: {
            type: Number,
            required: true
        },
        memoryLimitMB: {
            type: Number,
            required: true
        },
        inputConstraints: [{ type: String }]
    },
    tags: [{
        type: String,
        required: true
    }],
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },
    testCases: [{
        input: String,
        output: String,
        explanation: String,
        hidden: { type: Boolean, default: true }
    }],
    languagesAllowed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language"
    }],
    idealComplexity: {
        time: {
            type: String,
            enum: ["O(1)", "O(log n)", "O(√n)", "O(n)", "O(n log n)", "O(n^2)", "O(n^3)", "O(2^n)", "O(n!)"],
            required: true
        },
        space: {
            type: String,
            enum: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
            required: true
        }
    },
    judge: {
        type: {
            type: String,
            enum: ["standard", "special"],
            default: "standard"
        },
        caseSensitive: { type: Boolean, default: true },
        trimOutput: { type: Boolean, default: true }
    }

})

const CodingQuestion = mongoose.model("CodingQuestion", codingQuestionSchema);

export default CodingQuestion;