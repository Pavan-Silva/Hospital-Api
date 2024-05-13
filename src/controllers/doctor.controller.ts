import { NextFunction, Request, Response } from "express";
import Doctor, { IDoctor } from "../models/doctor.model";
import ResponseError from "../configs/ResponseError";

export const getDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      throw new ResponseError(404, "Doctor not found");
    }

    res.json(doctor);
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctor = await Doctor.create(req.body as IDoctor);
    res.status(201).json(doctor);
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body as IDoctor);

    if (!doctor) {
      throw new ResponseError(404, "Doctor not found");
    }

    const updatedDoctor = await Doctor.findById(id);
    res.status(200).json(updatedDoctor);
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      throw new ResponseError(404, "Doctor not found");
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error: any) {
    next(error);
  }
};
