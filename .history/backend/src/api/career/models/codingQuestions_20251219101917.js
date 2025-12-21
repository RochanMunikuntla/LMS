import mongoose from "mongoose";
import { stringify } from "uuid";

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
    constraints: [{
        type: String,
        required: true
    }],
    tags: [{
        type: String,
        required: true
    }],
    samples: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestCase",
        required: true
    }],
    hiddenTests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestCase",
        required: true
    }],
    languagesAllowed: [{
        type: stringify,
    
    }]

})