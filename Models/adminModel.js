const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


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

adminSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8)
    next()
})


adminSchema.methods.comparePassword = async function (inpPassword, password) {
    return await bcrypt.compare(inpPassword, password)
}


const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin