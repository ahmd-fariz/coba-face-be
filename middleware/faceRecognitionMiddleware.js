import * as faceapi from "face-api.js";
import { fileURLToPath } from "url";
import canvas from "canvas";
import path from "path";
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

//const modelPath = path.join(__dirname, 'models'); // Path ke model face-api.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const modelPath = path.join(__dirname, "../public/models"); // Path ke model face-api.js

// Load model face-api.js
const loadModels = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
};

loadModels();

// console.log(loadModels);

// mengenali wajah
const recognizeFace = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file provided" });
  }

  const img = await canvas.loadImage(req.file.path);
  const detections = await faceapi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detections) {
    return res.status(400).json({ message: "No face detected" });
  }

  req.body.faceDescriptor = detections.descriptor; // Simpan faceDescriptor dalam req.body
  next();
};

export default recognizeFace;
