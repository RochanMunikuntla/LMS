import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],
    shuffleQuestions: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],
    published: {
        type: Boolean,
        default: false
    }
});

const questionSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },
    text: {
        type: String,
        required: true
    },
    type: [{
        type: String,
        enum: ["multiple_choice", "numerical", "true_false", "matching", "short_answer"],
        required: true
    }],
    options: [{
        text: String,
        isCorrect: Boolean
    }],
    correctAnswer: {
        type: Number
    },
    marks: {
        type: Number,
        default: 1
    }
});

const attemptSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    answers: [{
        type: [Number]
    }],
    score: {
        type: Number
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

export const Quiz = new mongoose.model("Quiz", quizSchema);
export const Question = new mongoose.model("Question", questionSchema);
export const Attempt = new mongoose.model("Attempt", attemptSchema);
