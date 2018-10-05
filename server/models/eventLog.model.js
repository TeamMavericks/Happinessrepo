import mongoose from "mongoose";

const EventLogSchema = new mongoose.Schema({
  meetingType: {
    type: String,
    trim: true,
    required: "Meeting Type is required"
  },
  description: {
    type: String,
    trim: true,
    required: "Meeting Description is required"
  }
});

export default mongoose.model("EventLog", EventLogSchema);
