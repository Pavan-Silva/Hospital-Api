import mongoose from "mongoose";

export interface IAppointment {
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
}

const AppointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor ID is required"],
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient ID is required"],
    },

    date: {
      type: String,
      required: [true, "Date is required"],
    },
  },

  { timestamps: true }
);

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);

export default Appointment;
