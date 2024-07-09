// const { Attendance, User } = require('../models');
// import { attendanceModel, User} from "../models"
import User from "../models/usersModel.js";
import Attendance from "../models/attendanceModel.js";
// const faceapi = require("face-api.js");
import faceapi from "face-api.js";

export const markAttendance = async (req, res) => {
  const { faceDescriptor } = req;
  const allUsers = await User.findAll();
  const labeledDescriptors = allUsers.map((user) => ({
    label: user.id.toString(),
    descriptors: [Float32Array.from(JSON.parse(user.faceDescriptor))],
  }));

  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
  const bestMatch = faceMatcher.findBestMatch(
    Float32Array.from(faceDescriptor)
  );

  if (bestMatch.label === "unknown") {
    return res.status(404).json({ error: "User not recognized" });
  }

  try {
    const attendance = await Attendance.create({ userId: bestMatch.label });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark attendance" });
  }
};
