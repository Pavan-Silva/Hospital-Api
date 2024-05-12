import { Request, Response } from "express";
import Patient from "../models/patient.model";

const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientById = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updatePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, req.body);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updatedPatient = await Patient.findById(id);
    res.status(200).json(updatedPatient);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deletePatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
