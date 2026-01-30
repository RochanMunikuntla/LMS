import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  due: {
    type: Date,
    default: function() {
      const now = new Date();
      now.setHours(23, 59, 0, 0);
      return now;
    },
    set: function (value) {
      const date = new Date(value);
      date.setHours(23, 59, 0, 0);
      return date;
    }
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
