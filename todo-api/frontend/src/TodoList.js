import React, {Component} from 'react';
import TodoItem from './TodoItem';
const APIURL = '/api/todos';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }        
    }

    componentWillMount() {
        this.loadTodos();
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
            return <TodoItem key={todo._id} name={todo.name} completed={todo.completed}/>;
        });
        return (
            <div className="todo-list">
                <h1>todo list</h1>
                <ul>
                    {rows}
                </ul>
            </div>
           
        );
    }
}

export default TodoList;