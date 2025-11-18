import Reading from "../models/Reading.js";
import Sensor from "../models/Sensor.js";

export const addReading = async (req, res) => {
  try {
    const { sensorId, value } = req.body;

    const sensor = await Sensor.findById(sensorId);
    if (!sensor)
      return res.status(404).json({ message: "Sensor not found" });

    const reading = await Reading.create({ sensorId, value });

    res.json(reading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLatestReadings = async (req, res) => {
  try {
    const readings = await Reading.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("sensorId");

    res.json(readings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
