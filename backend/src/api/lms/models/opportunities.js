import mongoose from "mongoose";

const baseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
}, { discriminatorKey: "type", timestamps: true });

const Base = mongoose.model("Opportunity", baseSchema);

const Internship = Base.discriminator("Internship", new mongoose.Schema({
  stipend: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  }
}));

const Job = Base.discriminator("Job", new mongoose.Schema({
  salary: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    required: true,
    trim: true
  }
}));

export {Internship, Job};
