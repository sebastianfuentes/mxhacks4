var express = require('express');
var router = express.Router();
var query = require("../models/query")


var analyse = require("../middleware/labelDetection");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/analysis', function(req, res, next) {
	analyse.analyse("resources/img/onion.jpg", req, res, next);
  res.render('index', { title: 'Express' });
});


router.get('/recipe', function(req, res, next) {
	query.findAll(req,res);
});

router.get('/recipes', function(req, res, next) {
	query.findRecipesWith(req,res);
});

router.post('/register-recipe', function(req, res, next) {
	query.add(req,res);
});


module.exports = router;
