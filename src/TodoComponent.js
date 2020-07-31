import React,{useState} from 'react'
import {ListItem, ListItemText, IconButton, Checkbox, TextField} from "@material-ui/core";
import './TodoComponent.css';
import firebase from "firebase";
import db from './firebase';
import Card from '@material-ui/core/Card';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function TodoComponent(props) {
    const editTodoComponent = (event) => {
        event.preventDefault();
        setEditing(true);
    }
    const taskCompleteStateChange = (event) => {
        db.collection("todos").doc(event.currentTarget.dataset.todoid).update({
            taskCompleted: event.target.checked
        }) 
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
        if (event.keyCode === 27) {
            setEditing(false);
        }
    };
    const [editing, setEditing] = useState(false);

    return (
    <Card style={{marginTop:"10px"}}>
        
      <ListItem>
        {!editing ? (
            <>  
                <Checkbox
                    data-todoid={props.todo.id}
                    checked = {props.todo.taskCompleted}
                    onClick = {taskCompleteStateChange}
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
                <ListItemText
                    data-todoid={props.todo.id}
                    onDoubleClick={(event) => editTodoComponent(event)}
                    primary={props.todo.todo}
                    secondary={"⏰ " + (!props.todo.creationTime ? "" :  new Date(props.todo.creationTime.toDate()).toLocaleString())}
                    style={{ textDecoration : props.todo.taskCompleted ? 'line-through' : 'none', opacity: props.todo.taskCompleted? "0.75" : "1" }}

                />
                <IconButton
                    onClick={(event) => db.collection("todos").doc(props.todo.id).delete()}
                    edge="end"
                    aria-label="delete"
                >
                    <DeleteForeverIcon style={{ color: "green" }} />
                </IconButton>
            </>
        ) : (
            <TextField autoFocus={true} defaultValue={props.todo.todo} data-todoid={props.todo.id} onKeyUp={doneEditing.bind(this)}/>
        )}

      </ListItem>
        </Card>
    );
}

export default TodoComponent
