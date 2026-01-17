const express = require("express");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Temporary health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
  });
});

module.exports = app;
