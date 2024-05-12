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
import { checkRole } from "../middleware/auth";

const router = Router();

router.get("/", checkRole(["ADMIN"]), getAppointments);
router.get("/:id", checkRole(["ADMIN", "DOCTOR"]), getAppointmentById);

router.get(
  "/doctor/:id",
  checkRole(["ADMIN", "DOCTOR"]),
  getAppointmentsByDoctor
);

router.get("/patient/:id", checkRole(["ADMIN"]), getAppointmentsByPatient);

router.post("/", checkRole(["ADMIN"]), createAppointment);
router.put("/:id", checkRole(["ADMIN"]), updateAppointment);
router.delete("/:id", checkRole(["ADMIN"]), deleteAppointment);

export default router;
