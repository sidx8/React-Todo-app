import React, { useState, useEffect, useRef } from 'react';
import { Button,TextField } from '@material-ui/core';
import JSONbin from '../../node_modules/jsonbin-io.js/src/jsonbin-io.js';


function TodoForm(props) {
  const jsonbin = new JSONbin('$2b$10$VmLMPdNh2NT6iLKlBYwVA.LfjkqZhaFrXdndRC/lVeb3mW3Qz040q');

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
        const id = await jsonbin.create(data, '5f4fad1c993a2e110d3cdd26', input);
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


/*
import React, { useState } from "react";
import { Button,TextField } from '@material-ui/core';

 
  function TodoForm({ addTodo }) {
    const [value, setValue] = useState("");
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };

    <input
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        
      
       
    
  
    return (
        <div>
      <form onSubmit={handleSubmit}>
        
        </form>
      </div>
    );
  }  

export default TodoForm; 
*/

