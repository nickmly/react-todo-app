import React, {Component} from 'react';

const TodoItem = function(props) {
    const {name,completed} = props;
    var style = {
        textDecoration: completed? 'line-through' : 'none'
    }
    return (
        <li style={style}>{name}</li>
    );
    
}

export default TodoItem;