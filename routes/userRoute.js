var express = require('express');
const { register, userlogin } = require('../Controller/userAuthController');
var router = express.Router();

/* GET home page. */
router.route('/').post(register)

router.route('/login').post(userlogin)

module.exports = router;
