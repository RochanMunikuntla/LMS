import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    }, 
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        index: true
    }, 
    content: {
        type: String,
        required: true
    }, 
    example: {
        type: String,
        default: ""
    },
    testCases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestCase"
    }],
    timeLimitMs: {
        type: Number,
        default: 2000
    },
    memoryLimitKb: {
        type: Number,
        default: 65536
    }
}, { timestamps: true });


TopicSchema.index({ module: 1, index: 1 });

const Topic = mongoose.model("Topic", TopicSchema);
export default Topic;