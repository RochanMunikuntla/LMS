import mongoose from "mongoose";

const topicCodeSubmissionSchema = new mongoose.Schema({
    us: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
        index: true
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language"
    },
    sourceCode: {
        type: String,
        required: true
    },
    verdict: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

topicCodeSubmissionSchema.index({ user: 1, topic: 1, createdAt: -1 });

const TopicCodeSubmission = mongoose.model("CodeAttempt", topicCodeSubmissionSchema);

export default TopicCodeSubmission;
