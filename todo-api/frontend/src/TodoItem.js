import React, {Component} from 'react';

const TodoItem = function(props) {
    const {name,completed} = props;
    return (
        <li>{name}</li>
    );
    
}

export default TodoItem;