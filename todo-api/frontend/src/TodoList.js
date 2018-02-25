import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './TodoList.css';
const APIURL = '/api/todos';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodo: ""
        }
        //Bind all functions using this component as keyword this
        this.handleTodoInputChange = this.handleTodoInputChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.getTodoIndex = this.getTodoIndex.bind(this);
        this.onRemoveTodo = this.onRemoveTodo.bind(this);
        this.loadTodos = this.loadTodos.bind(this);
    }

    componentWillMount() {
        // When mounting, load list of todos
        this.loadTodos();
    }

    addTodo(e) {
        e.preventDefault();
        var data = {
            name: this.state.newTodo
        };

        if(data.name == "")
            return;
        //Send post request to api with the name of the new todo        
        fetch(APIURL, {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        })
        .then(function(res){
            return res.json();
        }).then(function(todo){
            this.setState({todos: [...this.state.todos,todo]});
        }.bind(this)).catch(function(error){
            console.log(error);
        });         
    }

    handleTodoInputChange(e){
        e.preventDefault();
        //Set newTodo state to the input value
        this.setState({newTodo: e.target.value});
    }

    getTodoIndex(id) {
        var todos = this.state.todos;
        // Find todo element's index with id
        return todos.map(function(element){
            return element._id;
        }).indexOf(id);        
    }

    onTodoClick(id) {
        // Toggle todo completion
        var todos = this.state.todos;
        var todoIndex = this.getTodoIndex(id);
        todos[todoIndex].completed = !todos[todoIndex].completed;
        this.setState({todos});
    }

    onRemoveTodo(id) {
        // Remove todo and reload all todos
        var todoIndex = this.getTodoIndex(id);
        
        fetch(APIURL + '/' + id, {
            method: 'delete',
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(function(res){
            this.loadTodos();
        }.bind(this))
        .catch(function(error){
            console.log(error);
        });
    }

    loadTodos() {
        // Ajax call to get data from the API 
        fetch(APIURL).then(function(data){
            if(!data.ok) { // If response has not delivered properly
                if(data.status >= 400 && data.status < 500) { // And you get a status code between 400 and 500
                    return data.json().then(function(data) { 
                        // Throw an error from the response's message
                        let error = {errorMessage: data.message};
                        throw error;
                    });
                } else {
                    // Otherwise we do not know what the error is
                    let error = {errorMessage: "Unknown error"};
                    throw error;
                }
            }
            // No errors, return the json version of the response
            return data.json();            
        }).then(function(todos){
            this.setState({todos}); // Set state of todos to the received todos from api
        }.bind(this)).catch(function(error){
            console.log(error); // catch any unwanted errors
        });
    }

    render() {        
        // Create array of list items from the todo array
        var rows = this.state.todos.map(function(todo){
            return <TodoItem 
                onClick={() => this.onTodoClick(todo._id)} 
                onRemove={() => this.onRemoveTodo(todo._id)} 
                key={todo._id} {...todo}/>;
        }, this);
        return (
            <div className="todo-list">
                <h1>todo list</h1>
                <TodoForm addTodo={this.addTodo} handleTodoInputChange={this.handleTodoInputChange}/>
                <ul>
                    {rows}
                </ul>
            </div>
           
        );
    }
}

export default TodoList;