var express = require('express');
const { adminlogin, adminRegister, isAdmin } = require('../Controller/adminAuthController');
const { searchUser, editUser, deleteUser, createUser, showUsers, approveRequest, addSlot, incuDetails } = require('../Controller/adminController');
const { requests, approved, booked } = require('../Controller/incubulationForm');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.route('/reg').post(adminRegister)

router.route('/login').post(adminlogin)

//router.use(isAdmin)

router.route('/searchUser').get(searchUser)

router.route('/bookeIncubulation/:id').post(addSlot)

router.route('/approveRequest/:id').get(approveRequest)

router.route('/incubation').get(incuDetails)

router.route('/requests').get(requests)

router.route('/approvedRequests').get(approved)

router.route('/bookedReq').get(booked)

router.route('/editUser/:id').post(editUser)

router.route('/deleteUser/:id').post(deleteUser)

router.route('/createUser').post(createUser)

router.route('/users').get(showUsers)

module.exports = router;
