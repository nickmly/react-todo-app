$(document).ready(function(){
    $.getJSON("/api/todos").then(function(data){
        addTodos(data);
    }).catch(handleError);
});

$("#todoInput").keypress(function(event) {
    if(event.which == 13) { // if enter pressed
        createTodo();
    }
});

// listen for clicks on spans that are inside the list class
// have to do this because when this function runs there are no spans on the page yet
$(".list").on("click", "span", function(){    
    deleteTodo($(this).parent());
});

$(".list").on("click", "li", function(event){
    event.stopPropagation();
    completeTodo($(this));
});

function completeTodo(todo){
    var todoID = todo.data("id");
    var todoCompleted = todo.data("completed");
    $.ajax({
        method: "PUT",
        url: "/api/todos/" + todoID,
        data: {
            completed: !todoCompleted
        }
    }).then(function(data){
        todo.toggleClass("done");
        todo.data("completed", !todoCompleted);
    }).catch(handleError);
}

function deleteTodo(todo){    
    var todoID = todo.data("id"); // Retrieve the ID from the list item
    $.ajax({
        method: "DELETE",
        url: "/api/todos/" + todoID
    }).then(function(data){
        todo.remove();    
    }).catch(handleError);
}


function createTodo(){
    var todoName = $("#todoInput").val();
    $.post("/api/todos", {name: todoName}).then(function(data){
        addSingleTodo(data);
        $("#todoInput").val("");
    }).catch(handleError);
}

function addTodos(todos){
    todos.forEach(function(element) {
        addSingleTodo(element);
    });
}

function addSingleTodo(todo){
    var newTodo = $("<li>" + todo.name + "<span>X</span></li>");
    newTodo.data("id", todo._id); // hidden data attribute
    newTodo.data("completed", todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $("ul").append(newTodo);
}

function handleError(err){
    var errorDiv = $("<div class='error'>" + err + "</div>");
    $("header").append(errorDiv);
}