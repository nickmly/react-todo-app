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
                <button><i class="fas fa-plus-circle"></i></button>
            </form>
        );
    }
}

export default TodoForm;