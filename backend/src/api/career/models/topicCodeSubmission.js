import mongoose from "mongoose";

const topicCodeSubmissionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        index: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
        index: true
    },
    languageId: {
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

const TopicCodeSubmission = mongoose.model("TopicCodeSubmission", topicCodeSubmissionSchema);

export default TopicCodeSubmission;
