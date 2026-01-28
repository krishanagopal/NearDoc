const express = require("express");
const router = express.Router();

const { getDoctors } = require("../controllers/doctor.controller");

// Get all doctors (discovery)
router.get("/", getDoctors);

module.exports = router;

