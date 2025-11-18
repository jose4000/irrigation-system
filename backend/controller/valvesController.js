import Valve from "../models/Valve.js";

import { sendValveCommand } from "../mqtt/mqttClient.js";

export const getValves = async (req, res) => {
  try {
    const valves = await Valve.find();
    res.json(valves);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const setValveState = async (req, res) => {
  try {
    const { valveId, state } = req.body; // state = true or false

    const valve = await Valve.findById(valveId);
    if (!valve)
      return res.status(404).json({ message: "Valve not found" });

    valve.status = state;
    await valve.save();

    // send the command to Espn via MQTT
    sendValveCommand(valveId, state);

    // Later you connect ESP32 using MQTT or WebSockets
    res.json({ message: "Valve updated", valve });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
