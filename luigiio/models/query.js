'use strict';

var mongoose = require('./recipe');
var Recipe = mongoose.model('Recipe');
var _ = require("lodash");

exports.findAll = (req, res, next)=> {
  Recipe.find((err, recipes)=> {
    if(err) res.send(500, err.message);
    if(res.status(200))
      res.status(200).jsonp(recipes);
    else
      res.send(recipes)
  });
};

exports.findById = (req, res)=> {
  Recipe.findById(req.params.id, (err, recipe)=> {
    if(err) return res.send(500, err.message);ß
    console.log('GET /recipes/' + req.params.id);
    res.status(200).jsonp(recipe);
  });
};

exports.findRecipesWith = (req,res)=>{
  let ingridients = req.query.ingridients.split(',');
  var recipes;
  Recipe.find({ingredients: { $in: ingridients }}, (err, queryObj) => {
    if(err || !queryObj)
      console.log(err);
    else 
      exports.sortByOcurrence(res, queryObj, ingridients);
  });
};

exports.sortByOcurrence = (res, recipes, ingredients)=>{
  recipes = recipes.map((e,i) => {
    var recipe = e;
    var ocurrences = 0;
    for(var ingredient of ingredients){
      if (e.ingredients.indexOf(ingredient) != -1) {
        ocurrences++;
        console.log(ocurrences);
      }
    }
    recipe["ocurrences"] = ocurrences;
    console.log(recipe);
    return recipe;
  });
  res.status(200).jsonp(recipes);
}

exports.add = (req, res)=> {
  var recipe = new Recipe({
    name: req.body.name,
    info: req.body.info,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    image_link: req.body.image_link
  });
  recipe.save(function(err) {
    if(err) return res.send(500, err.message);
    res.status(200).jsonp(recipe);
  });
  Recipe.find((err,recipes)=>{
    console.log(recipes);
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
