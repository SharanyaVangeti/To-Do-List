import React from 'react'
import axios from 'axios'
import { useState } from 'react';

function Create({setTodos}) {
  const [task,setTask]= useState('')
  const handleAdd=()=>{
    if(task.trim() === ''){
      return;
    }
    axios.post('http://localhost:3001/add',{task:task})
    .then(result => {

      console.log(result.data);
        setTask('')
        location.reload();
    })
    .catch(err=> console.log(err))
  }
  return (
    <div>
      <input type="text" placeholder='Enter the task' id="input" value={task} onChange={(event)=>setTask(event.target.value)}/>
      <button type="button" className='button' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
