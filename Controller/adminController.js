const User = require('../Models/userModel')
const response = require('./response')


//============ SEARCH USER ==============
exports.searchUser = async (req, res) => {
    try {
        const user = await User.find({ name: { $regex: new RegExp('^' + req.body.name + '.*', 'i') } })
        response('user details', user, 200, res)

    } catch (error) {
        response('error', error, 404, res)

    }
}


//============== EDIT USER ===================
exports.editUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        response('update user details', user, 200, res)

    } catch (error) {
        response('error', error, 404, res)

    }
}


//============= DELETE USER ==============
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        response('delete user', user, 204, res)
    } catch (error) {
        response('error', error, 404, res)

    }
}

//================ CREATE USER ================
exports.createUser = async (req, res) => {
    try {
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

//=============== SHOW USERS ==============
exports.showUsers = async (req, res) => {
    const user = await User.find()
    console.log(req.admin)
    response('users', user, 200, res)
}