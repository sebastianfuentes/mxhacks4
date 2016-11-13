var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

//POST - Insert a new register
exports.add = function(req, res) {
		console.log('POST');
		var recipe = new Recipe({
		name: req.body.name,
		info: req.body.info,
		ingredients: req.body.ingredients,
		instructions: req.body.instructions,
		image_link: req.body.image_link
	});
	recipe.save(function(err, recipe) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(recipe);
	});
};

//PUT - Update a register already exists
exports.update = function(req, res) {
	Recipe.findById(req.params.id, function(err, recipe) {
	recipe.name = req.body.name;
	recipe.info = req.body.info;
	recipe.ingredients = req.body.ingredients;
	recipe.instructions = req.body.instructions;
	recipe.image_link = req.body.image_link;
	recipe.save(function(err) {
		if(err) return res.send(500, err.message);
			res.status(200).jsonp(recipe);
		});
	});
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
	Recipe.findById(req.params.id, function(err, recipe) {
		recipe.remove(function(err) {
			if(err) return res.send(500, err.message);
				res.json({ message: 'Successfully deleted' });
			});
	});
};
