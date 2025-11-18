import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  valveId: { type: mongoose.Schema.Types.ObjectId, ref: "Valve" },
  startTime: String, 
  durationMinutes: Number,
  days: [String],
});

export default mongoose.model("Schedule", scheduleSchema);
