module.exports = (err,req,res,next) => {
    console.log("GLOBAL ERROR HANDLER");
  res.status(404).json({status: "FAIL", error: err, stack: err.stack});  
};