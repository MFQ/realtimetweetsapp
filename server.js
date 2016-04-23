// Require our dependencies
var express = require('express'),
	exphbs = require('express-handlebars'),
	http = require('http'),
	mongoose = require('mongoose'),
	twitter = require('ntwitter'),
	routes = require('./routes')
	config = require('./config'),
	streamHandler = require('./utils/streamHandler');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3000;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set("view engine", "handlebars")

// Disable etag headers on responses
app.disable('etag');

mongoose.connect('mongodb://localhost/react-tweets');

var server = http.createServer(app).listen(port, function() {
	console.log("Express server listening on port "+ port)
});

// create a new ntwitter instace 
var twit = new twitter(config.twitter);

// Index Route 
app.get("/", routes.index);

// Page Route 
app.get("/page/:page/:skip", routes.page);

// Set /public as our static content dir 
app.use("/", express.static(__dirname+"/public/"));


