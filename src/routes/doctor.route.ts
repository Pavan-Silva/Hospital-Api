import { Router } from "express";
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctor.controller";
import { checkRequiredRole } from "../middleware/auth.middleware";

const router = Router();
router.use(checkRequiredRole(["ADMIN"]));

router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/", createDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
