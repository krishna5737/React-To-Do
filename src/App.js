import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel, List, Grid} from "@material-ui/core";
import GreetComponent from './GreetComponent';
import TodoComponent from './TodoComponent';
import db from "./firebase";
import firebase from "firebase";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
import logo from './images/todo-banner.jpg';

function App() {
  
  const addTodo = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      taskCompleted: false
    });
    setInput("");
  };
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      alignItems: "center",
      justify: "center"
    },
    card:{
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  //fetch new data when app loads
  useEffect(() => {
    // use Effect works as listener and we can provide array list with component which needs to be listened
    db.collection('todos').orderBy('timeStamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc=> ({
        todo: doc.data().todo,
        id: doc.id,
        creationTime: doc.data().timeStamp,
        taskCompleted: doc.data().taskCompleted
      })))
    })
  }, [])
  const [todos, setTodos] = useState([]); 
  const [input, setInput] = useState("");
  const classes = useStyles();
  return (
    <div className="App">
      <Grid style={{ marginTop: "2%"}} container spacing={0} direction="column" className={classes.root} >
        <Grid margin-top="5%"item xs={12} className={classes.root}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={logo}
                title="Contemplative Reptile"
              />
              <CardContent>
              <GreetComponent/>
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
              <List className="todo-list">
                { todos.map((todo) => (
                  <TodoComponent 
                    todo={todo} 
                    key={todo.id}
                    />
                ))}
              </List>
              </CardContent>
            </CardActionArea>
            
          </Card>
        </Grid>
        
        
      </Grid>

    </div>
  );
}

export default App;
