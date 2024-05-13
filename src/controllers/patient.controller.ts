import { NextFunction, Request, Response } from "express";
import Patient, { IPatient } from "../models/patient.model";
import { ResponseError } from "../middleware/errorHandler";

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      let error: ResponseError = new Error("Appointment not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(patient);
  } catch (error) {
    next(error);
  }
};

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await Patient.create(req.body as IPatient);
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, req.body as IPatient);

    if (!patient) {
      let error: ResponseError = new Error("Appointment not found");
      error.statusCode = 404;
      throw error;
    }

    const updatedPatient = await Patient.findById(id);
    res.status(200).json(updatedPatient);
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      let error: ResponseError = new Error("Appointment not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    next(error);
  }
};
