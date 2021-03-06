var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();

//DB CONECTION
mongoose.connect('mongodb://localhost/recipes', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and Controllers
var models = require('./models/recipe')(app, mongoose);
var RecipeCtrl = require('./controllers/recipe');

var router = express.Router();

// Index
router.get('/', function(req, res) {
 res.send("LUIGIS");
});

app.use(router);

// API routes
var api = express.Router();

api.route('/recipes')
 .get(RecipeCtrl.findAll)
 .post(RecipeCtrl.add);

api.route('/recipes/:id')
 .get(RecipeCtrl.findById)
 .put(RecipeCtrl.update)
 .delete(RecipeCtrl.delete);

app.use('/api', api);

// Start server
app.listen(4000, function() {
 console.log("Node server running on http://localhost:3000");
});
