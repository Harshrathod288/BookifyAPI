const ADMIN = require('../models/admin');
const bcrypt = require('bcrypt');
const { Validator } = require('node-input-validator');
var jwt = require('jsonwebtoken');

exports.PROTECT = async function (req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            throw new Error("Please attache token")
        }
        var decoded = jwt.verify(token, 'CDMI');
        const checkuser = await ADMIN.findById(decoded.id)
        if (!checkuser) {
            throw new Error("Admin not found")
        }
        next();
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.alldata = async function (req, res, next) {
    try {
        // console.log(req.body);
        const findData = await ADMIN.find()
        res.status(201).json({
            status: "Success",
            message: "All Data Fond",
            data: findData,
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.addAdmin = async function (req, res, next) {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            throw new Error("Please attache valid field")
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const user = await ADMIN.create(req.body)
        let date_ob = new Date();
        res.status(201).json({
            status: "Success",
            message: "Admin added",
            data: user,
            date_ob
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.LoginAdmin = async function (req, res, next) {
    try {
        const inputvalid = new Validator(req.body, {
            email: 'required|email',
            password: 'required'
        });
        const matched = await inputvalid.check().then(function (matched) {
            if (!matched) {
                res.status(404).json({
                    status: "Fail",
                    message: inputvalid.errors
                });
            }
        });
        const checkuser = await ADMIN.findOne({ email: req.body.email })
        if (!checkuser) {
            throw new Error("Please enter valid email address")
        }
        const checkpass = await bcrypt.compare(req.body.password, checkuser.password)
        if (!checkpass) {
            throw new Error("Please enter valid password")
        }
        var token = jwt.sign({ id: checkuser._id }, 'CDMI'); 

        res.status(201).json({
            status: "Success",
            message: "Welcome back sir",
            data: checkuser,
            token
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.updateAdmin = async function (req, res, next) {
    try {
        const data = await ADMIN.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            status: "Success",
            message: "All Data Fond",
            data: data
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.deleteAdmin = async function (req, res, next) {
    try {
        const data = await ADMIN.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success",
            message: "Admin Remove",
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

