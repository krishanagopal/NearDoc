const express = require("express");
const router = express.Router();
const { doctorOnly } = require("../middleware/role.middleware");



const {
  createAvailability,
  getAvailabilityByDoctor,
} = require("../controllers/availability.controller");


const { protect } = require("../middleware/auth.middleware");

// Create availability (doctor)
router.post("/", protect, doctorOnly, createAvailability);

// Get availability by doctor
router.get("/:doctorId", protect, getAvailabilityByDoctor);

module.exports = router;
