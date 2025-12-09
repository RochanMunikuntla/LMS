import mongoose from "mongoose";

const quizProgressSchema = new mongoose.Schema({
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
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "careerQuiz",
        required: true,
        index: true
    },
    lastAttempt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "careerAttempt"
    },
    completed: {
        type: Number,
        default: 0
    },
    best


})