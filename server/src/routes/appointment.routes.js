const { protect } = require("../middleware/auth.middleware");
const { patientOnly, doctorOnly } = require("../middleware/role.middleware");

const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
} = require("../controllers/appointment.controller");

// Book appointment (patient)
router.post("/", protect, patientOnly, bookAppointment);

// Patient's appointments
router.get("/me", protect, patientOnly, getMyAppointments);

// Doctor's appointments
router.get("/doctor", protect, doctorOnly, getDoctorAppointments);

module.exports = router;
