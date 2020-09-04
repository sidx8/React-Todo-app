import React, { useState, useEffect, useRef } from 'react';
import { Button,TextField } from '@material-ui/core';
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
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
        <TextField
         ref={inputRef}
        className="input"
        value={input}
        variant="outlined"
        label="Update you task"
        onChange={handleChange} 
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
        Update 
      </Button>
        </>
      ) : (
        <>
         <TextField
         ref={inputRef}
        className="input"
        value={input}
        variant="outlined"
        label="add a task"
        onChange={handleChange} 
        />
        
        <Button onClick={handleSubmit} variant="contained" color="primary">
      Add a task
      </Button>
      </>
      )}
    </form>
  );
}

export default TodoForm;


