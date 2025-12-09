import mongoose from "mongoose";

const quizProgressSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    roadmap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap"
    },
    module: {
        
    }
})