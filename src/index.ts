require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware/authMiddleware";

import doctorRoute from "./routes/doctor.route";
import patientRoute from "./routes/patient.route";
import appointmentRoute from "./routes/appointment.route";
import authRoute from "./routes/auth.route";

const app = express();
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
  .connect(process.env.MONGODB_CONN_STRING as string)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  })
  .catch((err) => {
    console.log(err);
  });
