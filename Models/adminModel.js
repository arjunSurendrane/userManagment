const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({

    email: {
        type: String,
        require: [true, 'admin must have an email'],
        unique: true
    },

    password: {
        type: String,
        require: [true, 'admin must enter password'],
        select: false
    }
})


const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin