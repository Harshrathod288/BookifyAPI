var express = require('express');
var router = express.Router();
const adminController = require('../controller/admin')

const protecController = require('../controller/admin')

router.get('/alldata', protecController.PROTECT, adminController.alldata);

router.post('/Add', adminController.addAdmin);

router.patch('/update/:id', adminController.updateAdmin);

router.delete('/delete/:id', adminController.deleteAdmin);

router.post('/login', adminController.LoginAdmin);

module.exports = router;