const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    avatar:{
        type: String,
        required: true,
    },  
    password:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

module.exports = User = mongoose.model('User', userSchema);