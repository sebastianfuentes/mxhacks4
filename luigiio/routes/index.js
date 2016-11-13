var express = require('express');
var router = express.Router();

var analyse = require("../middleware/labelDetection");

/* GET home page. */
router.get('/', function(req, res, next) {
	// analyse.analyse("resources/img/onion.jpg", req, res, next);
  res.render('index', { title: 'Express' });
});

router.get('/analysis', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
