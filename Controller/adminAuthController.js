const jwt = require('jsonwebtoken')
const Admin = require('../Models/adminModel');
const User = require('../Models/userModel');


//=============== CREATE AND SEND TOKEN ================
const createAndSendToken = (msg, data, res) => {
    const token = jwt.sign({ id: data._id }, process.env.SECRET_CODE, {
        expiresIn: 60
    })
    const cookieOption = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.cookie('adminJwt', token, cookieOption)
    res.json({
        status: msg,
        data
    })
}








exports.adminlogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.json({ message: 'please eneter email and password' })
    const admin = await Admin.findOne({ email }).select('+password')

    if (!admin || !(await admin.comparePassword(password, admin.password))) return res.json({ message: 'invalid email or password' })
    createAndSendToken('logged in', { email: admin.email }, res)

}



exports.isAdmin = async (req, res, next) => {
    try {
        if (!req.cookies.adminJwt) return next();
        const decoded = await jwt.verify(req.cookies.adminJwt, process.env.SECRET_CODE)
        if (!decoded.id) return next();
        const admin = await Admin.findById(decoded.id)
        if (!admin) return next();
        req.admin = admin
        next()

    } catch (error) {
        next()
    }

}

exports.adminRegister = async (req, res) => {
    await Admin.create(req.body)
}