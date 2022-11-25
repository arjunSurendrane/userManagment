var express = require('express');
const { register, login } = require('../Controller/userAuthController');
var router = express.Router();

/* GET home page. */
router.route('/').post(register)

router.route('/login').post(login)

module.exports = router;
