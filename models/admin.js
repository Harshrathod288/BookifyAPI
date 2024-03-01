const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AdminSchema = new Schema({
    name : String,
    email : {
        type: String,
        unique : true
    },
    password : String,
});

const ADMIN = mongoose.model('Admin-details', AdminSchema);

module.exports = ADMIN;