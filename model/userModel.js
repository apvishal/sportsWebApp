const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'first name required']
    },
    lastName: {
        type: String,
        required: [true, 'last name required']
    },
    password: {
        type: String,
        required: [true, 'you need a pw'],
        minlength: 8
    },
    email: {
        type: String,
        required: [true, 'email required for verification'],
        unique: true
    }
});

// middleware to perform BEFORE saving to the database...
userSchema.pre('save', function(next) {
    console.log('FROM PRE SAVE MIDDLEWARE',this.password);
    next();
});
userSchema.methods.comparePasswords = async function(input) {
    console.log(input, this.password);
    return await bcrypt.compare(input, this.password);
};

const userModel = new mongoose.model('User', userSchema);

module.exports = userModel;