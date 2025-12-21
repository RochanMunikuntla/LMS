import mongoose from "mongoose";

const topicCodeSubmissionSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    topic: {
        type: ObjectId,
        ref: 'Topic',
        required: true,
        index: true
    },
    language: {
        type: String
    },
    sourceCode: {
        type: String
    },
    stdin: {
        type: String
    },
    stdout: {
        type: String
    },
    verdict: {
        type: String // AC, WA, TLE, RTE, etc.
    },  
    runtimeMs: {
        type: Number
    },
    memoryKb: {
        type: Number
    },
    score: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


topicCodeSubmissionSchema.index({ user: 1, topic: 1, createdAt: -1 });
const TopicCodeSubmission = mongoose.model("CodeAttempt", topicCodeSubmissionSchema);



export default TopicCodeSubmission;
