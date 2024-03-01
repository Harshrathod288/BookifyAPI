const RECIPE = require('../models/Recipeder')
const multer = require('multer')

exports.addrecipe = async function (req, res, next) {
    try {
        req.body.image = req.file.filename
        if (!req.body.title || !req.body.image || !req.body.video_url || !req.body.category_type || !req.body.serving || !req.body.PreparationTime || !req.body.CookingTime || !req.body.Ingredients || !req.body.Directions || !req.body.Tags) {
            throw new Error("Please enter valid fields")
        }
        const user = await RECIPE.create(req.body)
        res.status(201).json({
            status: "Suceess",
            message: "User added",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.singleRecipe = async function (req, res, next) {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "please provide id",
            });
        }
        const food = await RECIPE.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Recipe Found with this id",
            });
        }
        res.status(200).send({
            status: "Sucess",
            message: "Reciepe Found",
            data: food
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.updaterecipe = async function (req, res, next) {
    try {
        const user = await RECIPE.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            status: "Suceess",
            message: "Reciepe updated",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.deleterecipe = async function (req, res, next) {
    try {
        const user = await RECIPE.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Suceess",
            message: "Reciepe Deleted",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.allrecipe = async function (req, res, next) {
    try {
        const user = await RECIPE.find()
        res.status(201).json({
            status: "Suceess",
            message: "All Recipe Found",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}