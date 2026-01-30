import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['pdf', 'video', 'link'],
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    }
},{timestamps: true});

const Material = mongoose.model("Material", materialSchema);
export default Material;