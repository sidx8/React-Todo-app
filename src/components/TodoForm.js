import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import JSONbin from '../../node_modules/jsonbin-io.js/src/jsonbin-io.js';


function TodoForm(props) {
  const jsonbin = new JSONbin('$2b$10$8B3EUuMFFRhCUNXCAwsxcegeivgaavjlx1ZwrdvHGJXYqI0oIjWSS');

  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleUpdateSubmit = e => {
    e.preventDefault();
    (async () => {
      const data = {Task: input};
      try {
        const id = await jsonbin.create(data, '5f5139a9993a2e110d3db04e', input);
        console.log(id);
        props.onSubmit({
          text: input
        });
      
        setInput(''); 
      }
      catch (err) {
        console.error(err.message);
      }
    })();
         
  };

  const handleSubmit = e => {
    e.preventDefault();
    (async () => {
      const data = {Task: input};
      try {
        const id = await jsonbin.create(data, '5f5139a9993a2e110d3db04e', input);
        console.log(id);
        props.onSubmit({
          id: id,
          text: input
        });
      
        setInput(''); //-> '5c4cc6e7a1021c254834adab'
      }
      catch (err) {
        console.error(err.message);
      }
    })();
         //-> '5c4cc6e7a1021c254834adab'
  };

  return (
    <form onSubmit={props.edit ? handleUpdateSubmit : handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
        <Grid container direction="row" spacing={2} alignItems="center">
         <Grid item>
        <TextField
         ref={inputRef}
        className="input"
        value={input}
        variant="standard"
        label="Update you task"
        onChange={handleChange} 
        />
        </Grid>
        <Grid item>
        <Button onClick={handleUpdateSubmit} startIcon={<AddRoundedIcon />} variant="contained" color="default">
      Update your task
      </Button>
      </Grid>
      </Grid>
        </>
      ) : (
        <>
        <Grid container direction="row" spacing={2} alignItems="center">
         <Grid item>
         <TextField
         ref={inputRef}
        className="input"
        value={input}
        variant="standard"
        label="add a task"
        onChange={handleChange} 
        />
        </Grid>
        <Grid item>
        <Button onClick={handleSubmit} startIcon={<AddRoundedIcon />} variant="contained" color="default">
      Add a task
      </Button>
      </Grid>
      </Grid>
      </>
      )}
    </form>
  );
}

export default TodoForm;


