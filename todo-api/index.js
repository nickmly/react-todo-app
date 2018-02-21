var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var app = express();

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//
app.use(express.static(__dirname + "/public")); // use public directory
app.use(express.static(__dirname + "/views")); // use views directory

var models = require('./models');
var todoRoutes = require('./routes/todo');

app.get("/", function(req,res) {    
    res.send("Root route");
});

app.use("/api/todos", todoRoutes); // use todoRoutes but start each route with /api/todos

// Start server on port 3000 and local IP
app.listen(3000 || process.env.PORT, process.env.IP, function() {
    console.log("Server started");
});
