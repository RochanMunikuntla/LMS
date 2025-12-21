import mongoose from "mongoose";

const problemCodeSubmissionSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    userId: {

    }
})