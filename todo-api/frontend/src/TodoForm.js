import React, {Component} from 'react';
class TodoForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {addTodo,handleTodoInputChange} = this.props;
        return (
            <form onSubmit={addTodo}>
                <input onChange={handleTodoInputChange} type="text"/>
                <button>Add</button>
            </form>
        );
    }
}

export default TodoForm;