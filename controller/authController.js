const User = require('./../model/userModel');

exports.signup = async (req,res,next) => {
    try {
        // create a new user and push to database...
        const result = await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email: req.body.email
        });
        if (result) {
            return res.status(200).json({status:'success', data: {result}});
        }
        res.status(404).json({status:'fail', data: {result}});
    } catch (err) {
        next(err);
    }
};
exports.login = (req,res,next) => {
    res.status(200).json({data: 'this will be a login page'});
};
exports.getUsers = (req,res,next) => {

    res.status(200).json({data: 'this will be a getUsers page'});
};