const jwt = require("jsonwebtoken");
const IncuForm = require("../Models/incubulationModel");
const User = require("../Models/userModel");
const response = require('./response')




exports.isUser = async (req, res, next) => {
    try {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        const decoded = jwt.verify(token, process.env.SECRET_CODE)
        console.log(decoded)
        if (!decoded.id) return next()
        const user = await User.findById(decoded.id)
        if (!user) return next()
        req.user = user
        next()

    } catch (error) {
        next()
    }

}





//=============== CREATE AND SEND TOKEN ================
const createAndSendToken = async (msg, user, res) => {
    console.log(user._id)
    const token = await jwt.sign({ id: user._id }, process.env.SECRET_CODE, {
        expiresIn: process.env.EXPIRES_IN
    })
    const cookieOption = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.cookie('userJwt', token, cookieOption)
    res.json(
        {
            status: 'success',
            message: msg,
            user,
            token
        }
    )

}


//=============== CREATE USER =================
exports.register = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.create(req.body);
        createAndSendToken('new user', user, res)
        //  response("user created", user, 200, res);
    } catch (error) {
        res.json({ error })
    }
};

//==================== USER LOGIN =======================
exports.userlogin = async (req, res) => {
    try {
        console.log(req.body)
        if (!req.body.email || !req.body.password)
            return res.json({ message: "plese enter email and password" });
        const userExist = await User.findOne({
            email: req.body.email
        }).select('+password');
        if (!userExist || !await userExist.checkPassword(req.body.password, userExist.password)) return res.json({ message: "incorrect email or password" })
        createAndSendToken("login successfully", userExist, res)
        // response("login successfully", userExist, 200, res);
    } catch (error) {
        res.json({
            message: "login error",
            error,
        });
    }
};





