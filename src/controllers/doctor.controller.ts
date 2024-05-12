import { Request, Response } from "express";
import Doctor from "../models/doctor.model";

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.json(doctor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const updatedDoctor = await Doctor.findById(id);
    res.status(200).json(updatedDoctor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
