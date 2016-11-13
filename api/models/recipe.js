var mongoose = require('mongoose');
var Schema= mongoose.Schema;
var recipeSchema = new Schema({
  name: {type: String},
  info: {type: String},
  ingredients: {type: String},
  instructions: {type: String},
  image_link: {type: String}
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Recipe',recipeSchema);
