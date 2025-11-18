import Sensor from "../models/Sensor.js";

export const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.json(sensors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createSensor = async (req, res) => {
  try {
    const { name, type, pin, location } = req.body;

    const sensor = await Sensor.create({
      name,
      type,
      pin,
      location,
    });

    res.json(sensor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
