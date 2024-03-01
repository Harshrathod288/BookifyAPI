var express = require('express');
var router = express.Router();
const USER = require('../models/user')
const usercontroller = require('../controller/user')

router.get('/all', usercontroller.allresult);

router.post('/signup', usercontroller.Signup);

router.post('/login', usercontroller.login);

router.patch('/update/:id', usercontroller.updateres);

router.delete('/delete/:id', usercontroller.deleteres);

module.exports = router;
