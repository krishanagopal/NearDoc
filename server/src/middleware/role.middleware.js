const doctorOnly =(req,res,next)=>{
    if(req.user && req.user.role=== "doctor"){
        return next();
    }

    return res.status(403).json({
        message:"Access denied,doctor only",
    });
};


module.exports ={ doctorOnly};
