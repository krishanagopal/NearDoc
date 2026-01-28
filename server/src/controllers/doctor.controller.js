

const User = require("../models/User");

const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find(
      { role: "doctor" },
      "name specialization city _id"
    );

    return res.status(200).json({
      doctors,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getDoctors,
};
