const CATEGORY = require('../models/category')

exports.catAdd = async function (req, res, next) {
    try {
        // console.log(req.body);
        if (!req.body.mainname || !req.body.description || !req.body.image || !req.body.time) {
            throw new Error('Please Enter Valide Feilds')
        }
        const data = await CATEGORY.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "Data Added Successfully",
            data: data
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.delCat =  async function (req, res, next) {
    try {
        // console.log(req.body);
        await CATEGORY.findByIdAndDelete(req.params.id, req.body)
        res.status(201).json({
            status: "Success",
            message: "Data delete Successfully"
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.upCat =  async function (req, res, next) {
    try {
        // console.log(req.body);
        const data = await CATEGORY.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            status: "Success",
            message: "Data Update Successfully",
            data: data
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.findCat =  async function (req, res, next) {
    try {
        // console.log(req.body);
        const findData = await CATEGORY.find()
        res.status(201).json({
            status: "Success",
            message: "All Data Fond",
            data: findData
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}