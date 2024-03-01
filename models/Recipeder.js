const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const multer  = require('multer')

const RecipeSchema = new Schema({
  title: String,
  image: String,
  video_url: String,
  category_type: {
    type: String,
    // enum: ['Vegetarian', 'Non_Vegetarian', 'Vegan']
  },
  serving: {
    type: Number,
    Set: 0
  },
  PreparationTime: {
    type: Number,
  }, 
  CookingTime: {
    type: Number,
  },
  Ingredients: [String],
  Directions: [String],
  Tags:[String],
},
  { timestamps: true }
);

const RECIPE = mongoose.model("recipe", RecipeSchema)

module.exports = RECIPE
