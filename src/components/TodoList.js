import React, { useState } from 'react';
import { Switch, Typography, Grid, Paper } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FlareRoundedIcon from '@material-ui/icons/FlareRounded';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import JSONbin from '../../node_modules/jsonbin-io.js/src/jsonbin-io.js';
import TodoForm from './TodoForm';
import Todo from './Todo';


let req = new XMLHttpRequest();
var response = [];
req.open("GET", "https://api.jsonbin.io/e/collection/5f4fad1c993a2e110d3cdd26/all-bins", true);
req.setRequestHeader("secret-key", "$2b$10$VmLMPdNh2NT6iLKlBYwVA.LfjkqZhaFrXdndRC/lVeb3mW3Qz040q");
req.send();
req.onreadystatechange = async () => {
  if (req.readyState === XMLHttpRequest.DONE) {
   response = await req.responseText;
   console.log(JSON.parse(response).records);
  }
};

function TodoList() {
  const jsonbin = new JSONbin('$2b$10$VmLMPdNh2NT6iLKlBYwVA.LfjkqZhaFrXdndRC/lVeb3mW3Qz040q');
  const [todos, setTodos] = useState([
    {
      id: 327498733343,
      text:"this is hardcoded"
    },
    {
      id: 327348733343,
      text:"this is also hardcoded"
    },
    {
      id: 327578733343,
      text:"and so is this"
    }
  ]);

  
  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(...todos);
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

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  
  const [darkmode, SetDarkmode] = useState(false);

  const theme = createMuiTheme({
    palette:{
      type: darkmode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh", margin: "0vh"}}>
      <Grid container direction="column" alignItems="center">
        <Grid container direction="row" justify="flex-end" alignItems="center">  
        <FlareRoundedIcon />  
        <Switch checked={darkmode} onChange={() => SetDarkmode(!darkmode)} />
        <Brightness3Icon />
        </Grid>  
        <Typography variant="h2">ToDo App</Typography> 
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      </Grid>
      </Paper>
    </ThemeProvider>  
  );
}

export default TodoList;

