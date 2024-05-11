const express = require("express");
const router = express.Router();
const {
  getAppointmentById,
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment.controller");

router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
