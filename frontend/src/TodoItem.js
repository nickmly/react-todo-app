import React, {Component} from 'react';
import './TodoItem.css';

const TodoItem = function(props) {
    const {name,completed,id, onClick, onRemove} = props;
    var style = {
        textDecoration: completed ? 'line-through' : 'none'
    }
    return (
        <li onClick={() => onClick(id)} style={style}>{name}<i onClick={() => onRemove(id)} className="far fa-times-circle"></i></li>
    );
    
}

export default TodoItem;