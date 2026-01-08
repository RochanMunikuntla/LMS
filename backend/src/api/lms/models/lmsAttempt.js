import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lmsQuiz",
      required: true,
      index: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true
    },
    answers: [{
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lmsQuestion",
        required: true
      },
      selectedOptions: [Number], // index of option (recommended)
      tfAnswer: Boolean,
      numericalAnswer: Number,
      shortAnswer: String,
      marksAwarded: {
        type: Number,
        default: 0
      }
    }],

    score: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const lmsAttempt = mongoose.model("lmsAttempt", attemptSchema);

export default lmsAttempt;