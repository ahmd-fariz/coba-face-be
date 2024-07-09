import express from "express";
// const bodyParser = require("body-parser");
import bodyParser from "body-parser";
import cors from "cors";
// const userRoutes = require("./routes/users");
import userRoutes from "./router/userRoute.js";
// const attendanceRoutes = require("./routes/attendance");
import attendanceRoutes from "./router/attendanceRoute.js";
// const { db } = require("./models");
import db from "./config/Database.js";

const app = express();

// (async () => {
//   await db.sync();
// })();

app.use(cors());
// app.use(
//   cors({
//     credentials: true,
//     origin: [],
//   })
// );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(attendanceRoutes);

const PORT = process.env.PORT || 5000;

// db().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// });
