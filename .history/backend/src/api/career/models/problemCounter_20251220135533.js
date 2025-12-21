import mongoose from "mongoose";

const problemCounterSchema = new mongoose.Schema({
    difficulty: {
        type: String,
        required: true
    },
    counter: {
        type: Number,
        default: 0
    }
})

const ProblemCounter = mongoose.model("ProblemCounter", problemCounterSchema);


