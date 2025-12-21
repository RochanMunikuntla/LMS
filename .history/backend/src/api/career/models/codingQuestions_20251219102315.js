import mongoose from "mongoose";

const codingQuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inputFormat: {
        type: String,
        required: true
    },
    outputFormat: {
        type: String,
        required: true
    },
    constraints: {
        timeLimitMs: { 
            type: Number, required: true },
        memoryLimitMB: { type: Number, required: true },
        inputConstraints: [{ type: String }]
    },
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
        type: String,
        required: true
    }],
    boilerPlate: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

})