import mongoose from "mongoose";

const problemCodeSubmissionSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodingQuestion"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        
    }
})