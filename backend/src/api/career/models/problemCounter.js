import mongoose from "mongoose";

const problemCounterSchema = new mongoose.Schema({
    difficulty: {
        type: String,
        required: true,
        enum: ["Easy", "Medium", "Hard"],
        unique: true
    },
    counter: {
        type: Number,
        default: 0
    }
})

const ProblemCounter = mongoose.model("ProblemCounter", problemCounterSchema);

export default ProblemCounter;
