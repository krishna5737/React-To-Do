import React, { useState, useEffect } from "react";
import "./App.css";
import { List, Grid} from "@material-ui/core";
import GreetComponent from './GreetComponent';
import TodoComponent from './TodoComponent';
import db from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import logo from './images/todo-banner.jpg';
import AddTaskComponent from './AddTaskComponent';

function App() {
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      alignItems: "center",
      justify: "center"
    },
    card:{
      minWidth: 200,
    },
    media: {
      height: '15vh',
      width: 345
    },
    list: {
      maxHeight: 310,
      marginBottom: 15,
      overflowY: "auto"
    }
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
  const classes = useStyles();
  return (
    <div className="App">
      <Grid style={{ marginTop: "2%"}} container spacing={0} direction="column" className={classes.root} >
        <Grid margin-top="5%"item xs={12} className={classes.root}>
          <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={logo}
                title="Contemplative Reptile"
              />
              <CardContent>
              <GreetComponent/>
              <AddTaskComponent/>
              <List className={classes.list}>
                { todos.map((todo) => (
                  <TodoComponent 
                    todo={todo} 
                    key={todo.id}
                    />
                ))}
              </List>
              </CardContent>
          </Card>
        </Grid>
        
      </Grid>

    </div>
  );
}

export default App;
