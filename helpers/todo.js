var db = require('../models/'); // Get all models from model folder (index.js)
var Todo = db.Todo;

exports.getTodos =  function(req,res){
    Todo.find().then(function(todos){ // We can wrap any db func in a promise like so
        res.json(todos);
    }).catch(function(err){
        res.send(err);
    })
}

exports.addTodo = function(req,res){
    console.log(req.body);
    Todo.create(req.body).then(function(newTodo){
        res.status(201).json(newTodo); // 201 status is just to ensure the sender that it worked
    }).catch(function(err){
        res.send(err);
        console.log(err);
    });
}

exports.showTodo =  function(req,res){
    Todo.findById(req.params.todoID).then(function(todo){
        res.json(todo);
    }).catch(function(err){
        res.send(err);
        console.log(err);
    });
}

exports.updateTodo = function(req,res){
    // ID of todo to update, object to update with, use new todo in promise
    Todo.findByIdAndUpdate(req.params.todoID, req.body, {new: true}).then(function(todo){
        res.json(todo);
    }).catch(function(err){
        res.send(err);
        console.log(err);
    });
}

exports.deleteTodo =  function(req,res){
    Todo.findByIdAndRemove(req.params.todoID).then(function(){
        res.json({message: "Deleted todo"});
    }).catch(function(err){
        res.send(err);
        console.log(err);
    });
}
module.exports = exports;