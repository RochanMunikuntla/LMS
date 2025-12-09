import mongoose from "mongoose";

const projectCollabSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    collaborators: {
        
    }
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

})