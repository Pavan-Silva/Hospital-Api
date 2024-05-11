require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const doctorRoute = require("./routes/doctor.route");
const patientRoute = require("./routes/patient.route");
const appointmentRoute = require("./routes/appointment.route");

const app = express();
app.use(express.json());

app.use("/api/doctors", doctorRoute);
app.use("/api/patients", patientRoute);
app.use("/api/appointments", appointmentRoute);

app.get("/test", (req, res) => {
  res.send("API is running");
});

mongoose
  .connect(process.env.MONGODB_CONN_STRING)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  })
  .catch((err) => {
    console.log(err);
  });
