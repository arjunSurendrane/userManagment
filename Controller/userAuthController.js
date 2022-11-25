const User = require("../Models/userModel");
const response = require('./response')


//=============== CREATE USER =================
exports.register = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        response("user created", user, 200, res);
    } catch (error) {
        if (error.keyPattern.email) {
            res.json({
                message: "duplicate emailid",
            });
        } else if (error.keyPattern.mobile) {
            res.json({
                messsage: "duplicate mobile number",
            });
        }
    }
};

//==================== USER LOGIN =======================
exports.login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password)
            return res.json({ message: "plese enter email and password" });
        const userExist = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (!userExist) return res.json({ message: "incorrect email or password" });
        response("login successfully", userExist, 200, res);
    } catch (error) {
        res.json({
            message: "error",
            error,
        });
    }
};
