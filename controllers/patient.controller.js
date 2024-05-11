const Patient = require("../models/patient.model");
const mongoose = require("mongoose");

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndUpdate(id, req.body);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const updatedPatient = await Patient.findById(id);
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
};