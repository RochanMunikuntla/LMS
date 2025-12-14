import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: true,
        lowercase: true,
        unique: true,
        trim: true
    }
})