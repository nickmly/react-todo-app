var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var app = express();

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//

app.use(express.static(path.join(__dirname,'/frontend/build'))); // use react build directory
app.use(express.static(__dirname + '/frontend/public')); // use public directory
// app.use(express.static(__dirname + "/views")); // use views directory

var models = require('./models');
var todoRoutes = require('./routes/todo');

app.use('/api/todos', todoRoutes); // use todoRoutes but start each route with /api/todos

app.get('*', function(req,res) {  
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start server on port 8080 and local IP
app.listen(process.env.PORT || 8080, process.env.IP, function() {
    console.log('Server started');
});
