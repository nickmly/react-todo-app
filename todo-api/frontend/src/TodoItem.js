import React, {Component} from 'react';

const TodoItem = function(props) {
    const {name,completed,id, onClick, onRemove} = props;
    var style = {
        textDecoration: completed ? 'line-through' : 'none'
    }
    return (
        <li onClick={() => onClick(id)} style={style}>{name}<span onClick={() => onRemove(id)}>X</span></li>
    );
    
}

export default TodoItem;