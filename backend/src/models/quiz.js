import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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
    options: {
        type: [String]
    },
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

const Quiz = new mongoose.model("Quiz", quizSchema);
const Question = new mongoose.model("Question", questionSchema);
const Attempt = new mongoose.model("Attempt", attemptSchema);

export default { Quiz, Question, Attempt };