const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'user must have name']
    },
    email: {
        type: String,
        require: [true, 'user must have an email'],
        unique: true
    },
    mobile: {
        type: Number,
        require: [true, 'user must have mobile number'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'user must enter password'],
        select: false
    }
})


const User = mongoose.model('User', userSchema)
module.exports = User