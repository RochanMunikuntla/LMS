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
    description:{
        type: String,
        required: true
    },
    inputFormat:{
        type: String,
        required: true
    },
    outputFormat:{
        type: String,
        required: true
    },
    constraints: 
})