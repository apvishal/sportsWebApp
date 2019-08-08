const User = require('./../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const grantToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES
    });
};
const encryptPassword = async (pw) => {
    return await bcrypt.hash(pw, 12);
};
exports.signup = async (req,res,next) => {
    try {
        const encryptedPW = await encryptPassword(req.body.password);
        // create a new user and push to database...
        const newUser = await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password: encryptedPW,
            email: req.body.email
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

        // extract token
        const currentToken = req.headers.authorization.split(' ')[1];

        // check if token is valid...
        // await promisify(jwt.verify)(currentToken, process.env.JWT_SECRET);
        jwt.verify(currentToken, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return next(err);
            }
        });

        next();

    } catch(err) {
        next(err);

    }
};