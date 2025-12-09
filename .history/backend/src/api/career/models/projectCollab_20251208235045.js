import mongoose from "mongoose";

const projectCollabSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})