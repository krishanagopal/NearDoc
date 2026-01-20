const User = require("../models/User.js");
const generateToken = require("../utils/generateToken");

// register user api cntrller
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


//login user api controller

const loginUser= async(req,res)=>{
  try{
    const{email,password}=req.body;

    //validationfor req field

    if(!email || !password){
      return res.status(400).json({
        message:"please provide all reqired credentials",
      });
    }

    //check for the existing user in the database

    const user =await User.findOne({email}).select("+password");
    if(!user){
      return res.status(400).json({
        message:"invalid email or wrong password",
      });
    }

    //verify password

    const isMatch= await user.comparePassword(password);

    if(!isMatch){
      return res.status(400).json({
        message:"invalid email or password",

      });
    }


    const token = generateToken(user._id);
    //login successful
    res.status(200).json({
      message:"login successful",
      token,

    });

  }catch(error){
    res.status(500).json({
      message:"something went wrong",
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
