import React from 'react'
import {ListItem, ListItemText, IconButton} from "@material-ui/core";
import './TodoComponent.css';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function TodoComponent(props) {
    return (
        <ListItem>
            <ListItemText width="70%" primary={props.todo.todo} secondary= {"Last Updated On: ⏰ " + (!props.todo.creationTime ? '' : new Date(props.todo.creationTime.toDate()).toLocaleString()) } />    
            <IconButton edge="end" aria-label="delete">
                    <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
            </IconButton>
            
        </ListItem>
        
    )
}

export default TodoComponent
