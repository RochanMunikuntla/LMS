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
        ref: "Module"
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "careerQuiz"
    },

})