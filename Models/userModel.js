const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


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


userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8)
    next()
})

userSchema.methods.checkPassword = async function (inpPassword, password) {
    return await bcrypt.compare(inpPassword, password)

}

const User = mongoose.model('User', userSchema)
module.exports = User