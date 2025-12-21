import mongoose from "mongoose";

const codingQuestionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    
})