import mongoose from "mongoose";

const projectCollabSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    collaborators: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "St"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

})