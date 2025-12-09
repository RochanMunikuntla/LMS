import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  option: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
  explanation: { type: String, default: "" }
}, { _id: true });

const questionSchema = new mongoose.Schema({
  importId: {
    type: String,
    index: true,
    required: false
  },

  question: {
    type: String,
    required: true,
    trim: true
  },

  type: {
    type: String,
    enum: ["MC", "TF", "Short", "Numerical"],
    required: true
  },

  // For MC questions
  options: {
    type: [optionSchema],
    default: []
  },

  // For TF and Numerical questions
  answer: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },

  // For Short Answer type
  answers: {
    type: [String],
    default: []
  },

  // Useful for matching or future question types
  pairs: {
    type: Array,
    default: []
  },

  marks: {
    type: Number,
    default: 1
  }

}, { timestamps: true });

export const Question = mongoose.model("Question", questionSchema);
