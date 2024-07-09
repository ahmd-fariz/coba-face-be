import express from "express";
import { markAttendance } from "../controller/attendanceController.js";
import multer from "multer";
import recognizeFace from "../middleware/faceRecognitionMiddleware.js";

const upload = multer({ dest: "public/images" });
const router = express.Router();

router.post("/mark", upload.single("image"), recognizeFace, markAttendance);

export default router;
