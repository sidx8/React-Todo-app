import React from 'react';
import { Switch, Typography, Grid, Button, Paper, TextField } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FlareRoundedIcon from '@material-ui/icons/FlareRounded';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
   /* <form onSubmit={handleSubmit}>
         <TextField className="input" type="text" id="outlined-basic" label="Add a Task" variant="outlined" value={value} onChange={e => setValue(e.targeti.value)} />
    </form>
   */
   <form onSubmit={handleSubmit}>
     <TextField className="input" type="text" id="outlined-basic" label="Add a Task" variant="outlined" value={value} onChange={e => setValue(e.targeti.value)} />
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}  


function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build a todo app",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  const [darkMode, SetDarkmode] = React.useState(false);
  
  const theme = createMuiTheme({
    palette:{
      type: darkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh", margin: "0vh"}}>
        <Grid container direction="column" alignItems="center">
        <Grid container direction="row" justify="flex-end" alignItems="center">
        <FlareRoundedIcon />  
        <Switch checked={darkMode} onChange={() => SetDarkmode(!darkMode)} />
        <Brightness3Icon />
        </Grid>  
        <Typography variant="h2">ToDo App</Typography>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} /> 
        <Button variant="contained" color="primary">
        Add a task
        </Button>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
