import mongoose from "mongoose";

const EventLogSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required"
  },
  meetingType: {
    type: String,
    trim: true,
    required: "Meeting Type is required"
  },
  teamName: {
    type: String,
    trim: true,
    required: "Team Name is required"
  },
  description: {
    type: String,
    trim: true,
    required: "Meeting Description is required"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("EventLog", EventLogSchema);
