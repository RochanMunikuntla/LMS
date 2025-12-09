import mongoose, { mongo } from "mongoose";

const quizSchema = new mongoose.Schema({
    importId: {
        type: String,
        required: true
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module"
    },
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
    }
});

const questionSchema = new mongoose.Schema({
    importId: {
        type: String,
        required: true
    },

    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },

    question: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["MC", "TF", "Short", "Numerical", "Matching"],
        required: true
    },

    // For MC questions
    options: [{
        option: String,
        isCorrect: Boolean,
        explanation: String
    }],

    // For TF and Numerical
    answer: {
        type: mongoose.Schema.Types.Mixed, 
        default: null
        // Boolean for TF
        // Number for Numerical
    },

    // For Short Answer
    answers: [String],

    // For Matching questions
    pairs: [{
        left: String,
        right: String
    }],

    marks: {
        type: Number,
        default: 1
    }
});


const attemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "careerQuiz", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // answers: array of per-question responses
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },

    selectedOptions: [{ type: mongoose.Schema.Types.ObjectId }],
    tfAnswer: Boolean,
    numericalAnswer: Number,
    shortAnswer: String,

    marksAwarded: { type: Number, default: 0 }
  }],

  score: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now }

}, { timestamps: true });

export const careerQuiz = mongoose.model("careerQuiz", quizSchema);
export const careerQuestion = mongoose.model("careerQuestion", questionSchema);
export const careerAttempt = mongoose.model("careerAttempt", attemptSchema);

careerQuestion.createIndexes({ importId: 1 });
careerQuiz.createIndexes({ importId: 1 });