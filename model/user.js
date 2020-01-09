const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is a must!']
    },
    email: {
        type: String,
        required: [true, 'email is a must!']
    },
    pass: {
        type: String,
        required: [true, 'Password is a must!']
    }
});

module.exports = mongoose.model('users', userSchema);