var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.TODODBURL);

mongoose.Promise = Promise; // Allow us to use promise syntax onto mongo functions

module.exports.Todo = require("./todo"); // so you don't have to require the todo.js file manually