import mongoose from "mongoose";

export interface IDoctor {
  name: string;
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
      required: false,
    },
  },

  { timestamps: true }
);

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);
export default Doctor;
