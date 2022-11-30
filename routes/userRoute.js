var express = require('express');
const { formSubmition } = require('../Controller/incubulationForm');
const { register, userlogin, isUser } = require('../Controller/userAuthController');
const { userRequestDetails } = require('../Controller/userController');
var router = express.Router();

/* GET home page. */
router.route('/').get((req, res) => { res.send('welcome') })

router.route('/').post(register)

router.route('/login').post(userlogin)

router.use(isUser)

router.route('/incubulation').post(formSubmition)

router.route('/incuDetails').get(userRequestDetails)

module.exports = router;
