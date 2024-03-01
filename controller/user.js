const USER = require('../models/user')
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { Validator } = require('node-input-validator');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "hr928916@gmail.com",
        pass: "mtcb bjwx aoyf vpsh",
    },
});

async function main(email) {
    const info = await transporter.sendMail({
        from: 'hr928916@gmail.com',
        to: email,
        subject: " Welcome ", // Subject line
        // text: "Hello world?", // plain text body
        html: "<b>Welcome to Bookify</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
}


exports.Signup = async function (req, res, next) {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            throw new Error("Please enter valid fields")
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await USER.create(req.body)
        await main(user.email)
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

exports.updateres = async function (req, res, next) {
    try {
        const data = await USER.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            status: "Suceess",
            message: "user updated",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.deleteres = async function (req, res, next) {
    try {
        await USER.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "Suceess",
            message: "User deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.login = ('/login', async function (req, res, next) {
    try {
        const inputData = new Validator(req.body, {
            email: 'required|email',
            password: 'required'
        })
        inputData.check().then(function (matched) {
            if (!matched) {
                res.status(404).json({
                    status: "Fail",
                    message: inputData.errors
                });
            }
        });
        const checkuser = await USER.findOne({ email: req.body.email })
        if (!checkuser) {
            throw new Error("Please enter valid email adderes")
        }
        const checkpass = await bcrypt.compare(req.body.password, checkuser.password)
        if (!checkpass) {
            throw new Error("Please enter valid password")
        }
        res.status(201).json({
            status: "Succesful",
            message: "Login Succesul",
            data: checkuser
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
});

exports.allresult = async function (req, res, next) {
    try {
        const data = await USER.find()
        res.status(200).json({
            status: "Suceess",
            message: "All user found",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}