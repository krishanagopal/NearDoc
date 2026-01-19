const User = require("../models/User.js");


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

    //check forexisting user

    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.status(400).json({
        message   : "user already existed with the given email",
      });
    }


    //create new user

    const user= await User.create({
      name,
      email,
      password,
      role,
      city,
      pincode,
      specialization,
    });

    return res.status(201).json({
      message:"user created successfully",
      userId:user._id,
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
