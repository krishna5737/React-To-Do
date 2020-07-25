import React,{useState} from 'react'
import {ListItem, ListItemText, IconButton, TextField} from "@material-ui/core";
import './TodoComponent.css';
import firebase from "firebase";
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function TodoComponent(props) {
    const editTodoComponent = (event) => {
        event.preventDefault();
        setEditing(true);
    }
    const doneEditing = function(event){
        if (event.keyCode === 13) {
            if(event.target.value.trim().length > 0){
                db.collection("todos").doc(event.currentTarget.dataset.todoid).update({
                    todo: event.target.value.trim(),
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp()
                })
            }
            setEditing(false);
        }
        if (event.keyCode === 13) {
            setEditing(false);
        }
    };
    const [editing, setEditing] = useState(false);

    return (
      <ListItem>
        {!editing ? (
            <>
                <ListItemText
                    data-todoid={props.todo.id}
                    onDoubleClick={(event) => editTodoComponent(event)}
                    primary={props.todo.todo}
                    secondary={"Last Updated On: ⏰ " + (!props.todo.creationTime ? "" :  new Date(props.todo.creationTime.toDate()).toLocaleString())}
                />
                <IconButton
                    onClick={(event) => db.collection("todos").doc(props.todo.id).delete()}
                    edge="end"
                    aria-label="delete"
                >
                    <DeleteForeverIcon />
                </IconButton>
            </>
        ) : (
            <TextField autoFocus={true}  data-todoid={props.todo.id} onKeyUp={doneEditing.bind(this)} label={props.todo.todo} variant="outlined"/>
        )}

      </ListItem>
    );
}

export default TodoComponent
