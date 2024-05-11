const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },

  nic: {
    type: String,
    required: [true, "NIC number is required"],
  },

  gender: {
    type: String,
    required: [true, "Gender is required"],
  },

  address: {
    type: String,
    required: false,
  },
});

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
