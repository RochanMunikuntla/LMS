import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    importId: {
      type: String,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "lmsQuestion",
      required: true
    }],
    shuffleQuestions: {
      type: Boolean,
      default: false
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    attempts: {
        type: Number,
        default: 1
    },
    disabled: {
        type: Boolean,
        default: false
    },
    dueAt: {
        type: Date,
        required: true
    }
  },
  { timestamps: true }
);

const lmsQuiz = mongoose.model("lmsQuiz", quizSchema);

export default lmsQuiz;