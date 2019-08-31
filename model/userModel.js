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
    confirmPassword: {
        type: String,
        required: [true, 'must confirm your password!'],
        validate: {
            validator: function(pwConfirmation) {
                return pwConfirmation === this.password;
            },
            message: 'the passwords do not match!'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        required: [true, 'email required for verification'],
        unique: true
}
});

const encryptPassword = async (pw) => {
    return await bcrypt.hash(pw, 12);
};

// middleware to perform BEFORE saving to the database...
userSchema.pre('save', async function(next) {
    console.log('FROM PRE SAVE MIDDLEWARE',this);
    // encrypt the password before saving 
    this.password = await encryptPassword(this.password);
    this.confirmPassword = undefined;
    console.log("NEW PASS" + this.password);
    next();
});
userSchema.methods.comparePasswords = async function(input) {
    console.log(input, this.password);
    return await bcrypt.compare(input, this.password);
};

const userModel = new mongoose.model('User', userSchema);

module.exports = userModel;