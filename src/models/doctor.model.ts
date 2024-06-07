import mongoose from "mongoose";

export interface IDoctor {
  name: string;
  nic: string;
  phone: string;
  gender: string;
  specialization?: string;
}

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    nic: {
      type: String,
      required: [true, "NIC is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
    },

    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
  },

  { timestamps: true }
);

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);
export default Doctor;
