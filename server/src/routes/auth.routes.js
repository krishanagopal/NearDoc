const express = require("express");
const router = express.Router();



const { registerUser,
    loginUser
 } = require("../controllers/auth.controller");


 const { protect } = require("../middleware/auth.middleware");
// Register route
router.post("/register", registerUser);

//login route 
router.post("/login",loginUser);


// Test protected route
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;
