import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    key: {
        type: String,       // "python", "cpp", "java"
        unique: true
    },
    displayName: String,                 // "Python 3.10"
    judge0LanguageId: Number,             // 71
    boilerplate: String,                  // default template
});

const Language = mongoose.model("Language", languageSchema);

export default Language;