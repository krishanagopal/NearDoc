const express = require("express");
const authRoutes = require("./routes/auth.routes");
const availabilityRoutes =require("./routes/availability.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const cors= require ("cors");
const doctorRoutes = require("./routes/doctor.routes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

// Doctor routes
app.use("/api/doctors", doctorRoutes);

// Availability routes
app.use("/api/availability", availabilityRoutes);


// Appointment routes
app.use("/api/appointments", appointmentRoutes);

// Temporary health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
  });
});

module.exports = app;
