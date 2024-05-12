import mongoose from "mongoose";

export interface IUser {
  username: string;
  password: string;
  role: "ADMIN" | "DOCTOR";
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["ADMIN", "DOCTOR"],
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
