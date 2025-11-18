import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  name: String,
  type: String,
  pin: Number,
  location: String,
});

export default mongoose.model("Sensor", sensorSchema);
