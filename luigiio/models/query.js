"use strict";

var mongoose = require('../conf/database');
var _ = require("lodash");

var querySchema = mongoose.Schema({
  name: String,
  ingridients: [String]
});

var model = mongoose.model('query', querySchema);

exports.findAll = function(req, res) {
  Recipe.find(function(err, recipes) {
  if(err) res.send(500, err.message);
  console.log('GET /recipes')
  res.status(200).jsonp(recipes);
  });
};

exports.findById = function(req, res) {
  Recipe.findById(req.params.id, function(err, recipe) {
    if(err) return res.send(500, err.message);
      console.log('GET /recipes/' + req.params.id);
    res.status(200).jsonp(recipe);
  });
};

exports.findRecipesWith = function(ingridients){
  let recipes = []
  for(let ingridient of ingridients){
    model.find({ingridients: [ingridient]}, (err, queryObj)=> {
      if(err || !queryObj)
        console.log('test');
      else
        recipes.push(queryObj)
        console.log(queryObj);
    });
  }
  recipes = _.uniqBy(recipes, "_id");
  return recipes.map((i, e) => {
    let recipe = e;
    let ocurrences;
    for(ingridient of ingridients){
      if (e.indexOf(ingridient) != -1) {
        ocurrences++;
      }
    }
    recipe.ocurrences = ocurrences;
    return recipe;
  });
};
