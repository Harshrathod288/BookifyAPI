var express = require('express');
var router = express.Router();
const catController = require('../controller/category')

router.post('/add', catController.catAdd);

router.delete('/delete/:id', catController.delCat);

router.patch('/update/:id', catController.upCat);

router.get('/allcat', catController.findCat);

module.exports = router;
