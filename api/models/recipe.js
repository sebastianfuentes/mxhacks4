var mongoose = require('mongoose');
var Schema= mongoose.Schema;
var recipeSchema = new Schema({
  name: {type: string},
  info: {type: string},
  ingredients: {type: string},
  instructions: {type: string},
  image_link: {type: string}
});

module.exports = mongoose.model('Recipe',recipeSchema);
