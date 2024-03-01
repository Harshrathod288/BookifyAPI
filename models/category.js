const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    mainname:String,
    description: String,
    image:String,
    time: String,
});

const CATEGORY = mongoose.model('category', categorySchema);

module.exports = CATEGORY;