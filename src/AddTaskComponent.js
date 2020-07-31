import React,{useState} from 'react';
import db from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));
  
  export default function AddTaskComponent() {
    const addNewTask = (event) => {
        if(event === 13){
          addTodo();
        }  
      }
      const addTodo = (event) => {
        if(event){
          event.preventDefault(); 
        }
        if(input.trim().length){
            db.collection('todos').add({
              todo: input,
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              taskCompleted: false
            });

        }
        setInput("");
      };
    const classes = useStyles();
    const [input, setInput] = useState("");
    
    return (
      <Paper component="form" className={classes.root}>
        
        <InputBase
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyUp={(event) => addNewTask(event.keyCode)}
          className={classes.input}
          placeholder="✅  Add a Todo"
          inputProps={{ 'aria-label': 'Add new todo' }}
        />
        
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton type="submit" color="primary" className={classes.iconButton} aria-label="directions">
          <AddRoundedIcon
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo} />
        </IconButton>
      </Paper>
    );
  }
