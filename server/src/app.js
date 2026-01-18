const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/api/auth", authRoutes);


// Temporary health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
  });
});

module.exports = app;
