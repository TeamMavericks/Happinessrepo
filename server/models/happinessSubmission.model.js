import mongoose from "mongoose";

const HappinessSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required"
  },
  individualHappiness: {
    type: String,
    trim: true,
    required: "Individual Happiness is required"
  },
  teamHappiness: {
    type: String,
    trim: true,
    required: "Team Happiness is required"
  },
  teamName: {
    type: String,
    trim: true,
    required: "Team Name is required"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Happiness", HappinessSchema);
