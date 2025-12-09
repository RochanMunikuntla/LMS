import mongoose from "mongoose";

const projectCollabSchema = new mongoose.Schema({
    student: {
        
    }
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})