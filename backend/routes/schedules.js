import express from "express";
import { createSchedule, getSchedules } from "../controller/scheduleController.js";

const router = express.Router();

router.get("/", getSchedules);
router.post("/", createSchedule);

export default router;
