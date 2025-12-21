import mongoose from "mongoose";

const codingQuestionSchema = new mongoose.Schema({
    title: {
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
    samples: [{
        input: { String },
        output: { String },
        explanation: { String }
    }],
    hiddenTests: [{
        input: { String },
        output: { String },
        hidden: { type: Boolean, default: true }
    }],
    languagesAllowed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language"
    }],
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

