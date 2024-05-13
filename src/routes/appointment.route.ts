import { Router } from "express";
import {
  getAppointmentById,
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
} from "../controllers/appointment.controller";
import { checkRequiredRole } from "../middleware/auth";

const router = Router();

router.get(
  "/doctor/:id",
  checkRequiredRole(["ADMIN", "DOCTOR"]),
  getAppointmentsByDoctor
);

router.get(
  "/patient/:id",
  checkRequiredRole(["ADMIN"]),
  getAppointmentsByPatient
);

router.get("/", checkRequiredRole(["ADMIN"]), getAppointments);
router.get("/:id", checkRequiredRole(["ADMIN", "DOCTOR"]), getAppointmentById);
router.post("/", checkRequiredRole(["ADMIN"]), createAppointment);
router.put("/:id", checkRequiredRole(["ADMIN"]), updateAppointment);
router.delete("/:id", checkRequiredRole(["ADMIN"]), deleteAppointment);

export default router;
