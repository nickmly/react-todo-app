import React, {Component} from 'react';
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
        fetch(APIURL).then(function(data){
            return data.json();
        }).then(function(todos){
            this.setState({todos});
        }.bind(this)).catch(function(error){
            console.log(error);
        });
    }

    render() {
        var rows = this.state.todos.map(function(todo){
            return <li key={todo._id}>{todo.name}</li>;
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