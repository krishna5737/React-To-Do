import React,{useState} from 'react'
import {ListItem, ListItemText, IconButton, Checkbox, TextField} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import './TodoComponent.css';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import firebase from "firebase";
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function TodoComponent(props) {
    const editTodoComponent = (event) => {
        event.preventDefault();
        setEditing(true);
    }
    const taskCompleteStateChange = (event) => {
        let checked = event.target.checked
        db.collection("todos").doc(event.currentTarget.dataset.todoid).update({
            taskCompleted: checked
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
        if (event.keyCode === 13) {
            setEditing(false);
        }
    };
    const [editing, setEditing] = useState(false);

    return (
      <ListItem>
        {!editing ? (
            <>  
                <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    data-todoid={props.todo.id}
                    checked = {props.todo.taskCompleted}
                    onClick = {taskCompleteStateChange}
                    color="default"
                    style={{opcaity: '0.7'}}
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
                <ListItemText
                    data-todoid={props.todo.id}
                    onDoubleClick={(event) => editTodoComponent(event)}
                    primary={props.todo.todo}
                    secondary={"Last Updated On: ⏰ " + (!props.todo.creationTime ? "" :  new Date(props.todo.creationTime.toDate()).toLocaleString())}
                    style={{ textDecoration : props.todo.taskCompleted ? 'line-through' : 'none', opacity: props.todo.taskCompleted? "0.75" : "1" }}

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
            <TextField autoFocus={true}  data-todoid={props.todo.id} onKeyUp={doneEditing.bind(this)} label={props.todo.todo} />
        )}

      </ListItem>
    );
}

export default TodoComponent
