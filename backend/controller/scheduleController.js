import Schedule from "../models/Schedule.js";
import Valve from "../models/Valve.js";

export const createSchedule = async (req, res) => {
  try {
    const { valveId, startTime, durationMinutes, days } = req.body;

    const valve = await Valve.findById(valveId);
    if (!valve)
      return res.status(404).json({ message: "Valve not found" });

    const schedule = await Schedule.create({
      valveId,
      startTime,
      durationMinutes,
      days,
    });

    res.json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("valveId");
    res.json(schedules);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
