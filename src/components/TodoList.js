import React, { useState } from 'react';
import { Switch, Typography, Grid, Paper } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FlareRoundedIcon from '@material-ui/icons/FlareRounded';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import JSONbin from '../../node_modules/jsonbin-io.js/src/jsonbin-io.js';
import TodoForm from './TodoForm';
import Todo from './Todo';


const jsonbin = new JSONbin('$2b$10$h8/yUbhnIsOQsM0NOsHR4OKqt/Nd0kPqs4AgcvtcJ2yy7fqwxSami');
let req = new XMLHttpRequest();
req.open("GET", "https://api.jsonbin.io/e/collection/5f56aa8c993a2e110d407fef/all-bins", true);
req.setRequestHeader("secret-key", "$2b$10$h8/yUbhnIsOQsM0NOsHR4OKqt/Nd0kPqs4AgcvtcJ2yy7fqwxSami");
req.send();
    

function TodoList() {
  const [todos, setTodos] = useState([]);
   

  var response = [];
  req.onreadystatechange = async (todo) => {
  if (req.readyState === XMLHttpRequest.DONE) {
    try{
      response = await JSON.parse(req.responseText);
        let ids = [...response.records];
          console.log(ids);
      const getData =  () => {
        return ids.map( async({id})=>{
            todo = {     
            text :(await jsonbin.read(id,0)).text,
            id : id,
            }
          addTodo(todo);   
          })}
          getData();
    }
      catch (err){
       console.log(err.message);
       window.location.reload();
      }
  }
};


const addTodo = todo => {
  if (!todo.text || /^\s*$/.test(todo.text)) {
    return;
  }
  todos.push(todo);
  setTodos([...todos]);
  console.log(todos);
}; 
  
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    (async () => {
      try {
        const version = await jsonbin.update(todoId, newValue, true);
        console.log(version); //-> 1
      }
      catch (err) {
        console.error(err.message);
      }
    })();
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    (async () => {
      try {
        const msg = await jsonbin.delete(id);
        console.log(msg); 
      }
      catch (err) {
        console.error(err.message);
      }
    })();

    setTodos(removedArr);
  };

  
  
  const [darkmode, SetDarkmode] = useState(false);

  const theme = createMuiTheme({
    palette:{
      type: darkmode ? "dark" : "light",
    },
  });

  return (
      <Grid container direction="column" alignItems="center">
        <Grid item container direction="row" justify="center" alignItems="center">
        <ThemeProvider theme={theme}>
        <Paper style={{marginTop:"120px", padding:"3vh"}}>
          <Grid item xs={12} container direction="row" justify="flex-end" alignItems="center">  
            <FlareRoundedIcon />  
              <Switch checked={darkmode} onChange={() => SetDarkmode(!darkmode)} />
            <Brightness3Icon />
          </Grid>
          <Grid item>  
            <Typography variant="h3">Todo app</Typography>
          </Grid> 
          <Grid item> 
            <TodoForm onSubmit={addTodo} />
          </Grid>
          <Grid item style={{paddingTop:"1vh"}}>
            <Todo
              todos={todos}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          </Grid>
      </Paper>
      </ThemeProvider>  
      </Grid>
    </Grid>
    
  );
}

export default TodoList;

