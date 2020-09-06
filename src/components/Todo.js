import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { Grid, makeStyles, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { PacmanLoader	}	 from "react-spinners/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Todo = ({ todos, removeTodo, updateTodo }) => {

  const classes = useStyles();

  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  if(todos.length <= 0 ){
    return <Grid container direction="column" style={{height:"14vh"}} justify="center" alignItems="center"> 
    <Grid item >
    <PacmanLoader		
    size={20}
    color={"#f5c242"}
  />
   </Grid>
  </Grid>
   }

  return todos.map((todo, index) => (
    <List className={classes.root}>
      
          <ListItem key={index} role={undefined} dense button>
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
            <IconButton onClick={() => setEdit({ id: todo.id, value: todo.text })} edge="end" aria-label="comments">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => removeTodo(todo.id)} edge="end" aria-label="comments">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          </List>
        )
      )
  

  /*
  return todos.map((todo, index) => (
    <div key={index}>
        {todo.text}
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));*/
};

export default Todo;


