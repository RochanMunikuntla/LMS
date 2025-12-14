import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    count: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        uinq
    }
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;