const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'first name required']
    },
    lastName: {
        type: String,
        required: [true, 'last name required']
    },
    email: {
        type: String,
        required: [true, 'email required for verification'],
        unique: true
    }
});

const userModel = new mongoose.model('User', userSchema);

module.exports = userModel;