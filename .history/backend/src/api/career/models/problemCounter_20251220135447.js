import mongoose from "mongoose";

const problemCounterSchema = new mongoose.Schema({
    difficulty: {
        type: String,
        required: true
    },
    
})
