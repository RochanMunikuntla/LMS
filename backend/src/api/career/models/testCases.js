// models/TestCase.js
import mongoose from "mongoose";

const testCasesSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"
    },
    input: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    output: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    explanation: {
        type: String,
        default: ""
    },
    visible: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const TestCase = mongoose.model("TestCase", testCasesSchema);

export default TestCase;
