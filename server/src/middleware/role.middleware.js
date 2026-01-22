const doctorOnly =(req,res,next)=>{
    if(req.user && req.user.role=== "doctor"){
        return next();
    }

    return res.status(403).json({
        message:"Access denied,doctor only",
    });
};

const patientOnly = (req, res, next) => {
  if (req.user && req.user.role === "patient") {
    return next();
  }

  return res.status(403).json({
    message: "Access denied. Patient only.",
  });
};



module.exports ={ doctorOnly, patientOnly};