import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    doctor_id: {
      type: String,
      required: [true, "Doctor ID is required"],
    },

    patient_id: {
      type: String,
      required: [true, "Patient ID is required"],
    },

    date: {
      type: String,
      required: [true, "Date is required"],
    },

    time: {
      type: String,
      required: [true, "Time is required"],
    },
  },

  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
