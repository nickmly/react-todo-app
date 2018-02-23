import React, {Component} from 'react';

const TodoItem = function(props) {
    const {name,completed,id, onClick} = props;
    var style = {
        textDecoration: completed ? 'line-through' : 'none'
    }
    return (
        <li onClick={() => onClick(id)} style={style}>{name}</li>
    );
    
}

export default TodoItem;