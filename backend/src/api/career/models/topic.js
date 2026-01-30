import mongoose from "mongoose";

const ContentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        // common
        "concept_overview",
        "algorithm_explanation",
        "example",
        "edge_cases",
        "constraints",
        "complexity",
        "common_mistakes",
        "task",
        "solution",

        // DSA-specific
        "pseudocode",

        // language-specific
        "language_code"
      ]
    },


    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { _id: false }
);

const TopicSchema = new mongoose.Schema(
  {
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


    contentBlocks: {
      type: [ContentBlockSchema],
      required: true
    },

    // shown on LHS for learning
    sampleTestCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String, required: true }
      }
    ],

    // used by judge
    executionTestCases: [
      {
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true }
      }
    ],

    allowedLanguages: {
      type: [String], // ["python"] or ["c", "cpp", "java", "python"]
      required: true
    },

    timeLimitMs: {
      type: Number,
      default: 2000
    },

    memoryLimitKb: {
      type: Number,
      default: 65536
    }
  },
  { timestamps: true }
);

TopicSchema.index({ module: 1, index: 1 });

export default mongoose.model("Topic", TopicSchema);
