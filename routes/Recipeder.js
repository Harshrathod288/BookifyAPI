var express = require('express');
var router = express.Router();
const recipecontroller = require('../controller/Recipeder')
const RECIPE = require('../models/Recipeder')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/recipeimage')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

// ADD RECIPE
router.post('/add', upload.single('image'), recipecontroller.addrecipe);

// RECIPE UPDATE
router.patch('/update/:id', recipecontroller.updaterecipe);

// RECIPE DELETE
router.delete('/delete/:id', recipecontroller.deleterecipe);

// GET ALL RECIPE
router.get('/all', recipecontroller.allrecipe);

// GET SINGLE RECIPE
router.get("/get/:id", recipecontroller.singleRecipe);

module.exports = router;