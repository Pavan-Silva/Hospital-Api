import { Router } from "express";
import {
  getAppointmentById,
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";
import { checkRole } from "../middleware/authMiddleware";

const router = Router();

router.get("/", checkRole(["ADMIN", "DOCTOR"]), getAppointments);
router.get("/:id", checkRole(["ADMIN", "DOCTOR"]), getAppointmentById);
router.post("/", checkRole(["ADMIN"]), createAppointment);
router.put("/:id", checkRole(["ADMIN"]), updateAppointment);
router.delete("/:id", checkRole(["ADMIN"]), deleteAppointment);

export default router;
