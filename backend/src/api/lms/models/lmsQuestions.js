import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        importId: {
            type: String,
            required: true,
            index: true
        },
        index: {
            type: Number,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["mcq", "tf", "numerical", "coding"],
            required: true
        },

        options: [{
            index: Number,
            option: String,
            isCorrect: Boolean,
            explanation: String
        }],

        answer: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        tolerance: Number,
        answers: [String],

        pairs: [{
            left: String,
            right: String
        }],

        marks: {
            type: Number,
            default: 1
        }
    }
);

const lmsQuestion = mongoose.model("lmsQuestion", questionSchema);

export default lmsQuestion;