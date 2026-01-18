const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      city,
      pincode,
      specialization,
    } = req.body;

    // Basic required field check
    if (!name || !email || !password || !role || !city || !pincode) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    res.status(200).json({
      message: "Input validation passed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};


module.exports = {
  registerUser,
};
