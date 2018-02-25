var express = require('express');
var router = express.Router();


var Todo = require('../helpers/todo');

// api/todos/
router.get("/", Todo.getTodos);
router.post("/", Todo.addTodo);
//

// api/todos/id
router.get("/:todoID", Todo.showTodo);
router.put("/:todoID", Todo.updateTodo);
router.delete("/:todoID", Todo.deleteTodo);
//

module.exports = router;