const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const grantToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES
    });
};

exports.signup = async (req,res,next) => {
    try {
        // create a new user and push to database...
        const newUser = await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            email: req.body.email,
            role: req.body.role
        });
        if (newUser) {
            return res.status(200).json({status:'success', data: {newUser}});
        }
        res.status(404).json({status:'fail', data: {result}});
    } catch (err) {
        next(err);
    }
};
exports.login = async (req,res,next) => {
    try{
        console.log(req.body);
        // locate the user in the database...
        const currentUser = await User.findOne({email: req.body.email});
        if (!currentUser) return next(new Error('NO SUCH USER...'));
        // attempt to compare the passwords...
        const result = await currentUser.comparePasswords(req.body.password);
        if (result){
            // grant a token..
            const token = grantToken(currentUser._id);
            return res.status(200).json({status:'success', token});
        }
        return res.status(401).json({status:'fail', message: 'not authorized...'});
        
    }catch(err){
        return next(new Error(err));
    }
};
exports.getUsers = (req,res,next) => {

    res.status(200).json({data: 'this will be a getUsers page'});
};

exports.isLoggedIn = async(req,res,next) => {
    try {

        if (!req.headers.authorization) {
            return next(new Error("user is not logged in..."));
        }
        // extract token
        const currentToken = req.headers.authorization.split(' ')[1];

        // check if token is valid...
        // await promisify(jwt.verify)(currentToken, process.env.JWT_SECRET);
        let id = "";
        jwt.verify(currentToken, process.env.JWT_SECRET, function(err, decoded) {
            id = decoded.id;
            if (err) {
                return next(err);
            }
        });
        console.log("EXTRACTED ID = " + id);
        // get the user for use in the next middlewares...
        const currentUser = await User.findById(id);
        if (!currentUser) {
            return next("ERROR NO SUCH USER");
        }
        req.user = currentUser;
        
        next();

    } catch(err) {
        next(err);

    }
};

exports.restricted = (...roles) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.role)) {
            return next(new Error("you are not authroized to perform this action"));
        }
        next();    
    }

};