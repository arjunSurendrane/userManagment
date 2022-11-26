var express = require('express');
const { adminlogin, adminRegister, isAdmin } = require('../Controller/adminAuthController');
const { searchUser, editUser, deleteUser, createUser, showUsers } = require('../Controller/adminController');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.route('/reg').post(adminRegister)

router.route('/login').post(adminlogin)

router.use(isAdmin)

router.route('/searchUser').get(searchUser)

router.route('/editUser/:id').post(editUser)

router.route('/deleteUser/:id').post(deleteUser)

router.route('/createUser').post(createUser)

router.route('/users').get(showUsers)

module.exports = router;
