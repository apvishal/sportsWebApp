const League = require('./../model/leaguesModel');

exports.getSports = async (req,res,next) => {
    const leagues = await League.find();
    res.status(200).json({status:'success', data: leagues});
};
