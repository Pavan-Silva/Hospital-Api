import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/auth";

import doctorRoute from "./routes/doctor.route";
import patientRoute from "./routes/patient.route";
import appointmentRoute from "./routes/appointment.route";
import authRoute from "./routes/auth.route";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(authMiddleware);

app.use("/api/doctors", doctorRoute);
app.use("/api/patients", patientRoute);
app.use("/api/appointments", appointmentRoute);
app.use("/api/auth", authRoute);

app.get("/test", (req, res) => {
  res.send("API is running");
});

mongoose
  .connect(process.env.MONGODB_CONN_STRING || "")
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  })
  .catch((err) => {
    console.log(err);
  });
