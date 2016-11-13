var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipes');

module.exports = mongoose;
