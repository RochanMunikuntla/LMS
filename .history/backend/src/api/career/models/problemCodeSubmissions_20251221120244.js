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
    userMaxTimeComplexity: {
        type: Number
    }
    userMinTimeComplexity: {
        type: Number
    },
    
})