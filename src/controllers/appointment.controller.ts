import { NextFunction, Request, Response } from "express";
import Appointment from "../models/appointment.model";
import { IDoctor } from "../models/doctor.model";
import ResponseError from "../configs/ResponseError";

export const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      throw new ResponseError(404, "Appointment not found");
    }

    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentsByDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.doctorId,
    });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentsByPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.patientId,
    });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appointment = await Appointment.create(req.body as IDoctor);
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      req.body as IDoctor
    );

    if (!appointment) {
      throw new ResponseError(404, "Appointment not found");
    }

    const updatedAppointment = await Appointment.findById(id);
    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      throw new ResponseError(404, "Appointment not found");
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
