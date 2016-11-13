var mongoose = require('../conf/database');
var Schema= mongoose.Schema;

var recipeSchema = new Schema({
  name: {type: String},
  info: {type: String},
  ingredients: [{type: String}],
  instructions: {type: String},
  url: {type: String},
  image_link: {type: String}
});

module.exports = mongoose.model('Recipe',recipeSchema);