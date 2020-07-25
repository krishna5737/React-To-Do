import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button, FormControl,
  Input,
  InputLabel,
  List,
  Grid,
} from "@material-ui/core";
import TodoComponent from './TodoComponent';
import db from "./firebase";
import firebase from "firebase";

function App() {
  
  const addTodo = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");


  };
  //fetch new data when app loads
  useEffect(() => {
    // use Effect works as listener and we can provide array list with component which needs to be listened
    db.collection('todos').orderBy('timeStamp','desc').onSnapshot(snapshot => {
      
      setTodos(snapshot.docs.map(doc=> ({
        todo: doc.data().todo,
        id: doc.id,
        creationTime: doc.data().timeStamp
      })))
    })
  }, [])
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  
  return (
    <div className="App">
      <h1>To do List</h1>
      <FormControl>
        <InputLabel>✅  Write a Todo</InputLabel>
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </FormControl>
      <Grid container justify="center">
        <Grid item xs={10} sm={6}>
          <List className="todo-list">
            { todos.map((todo) => (
              <TodoComponent 
                todo={todo} 
                key={todo.id}
                />
            ))}
          </List>
        </Grid>
      </Grid>
        
    </div>
  );
}

export default App;
