import {React, useState} from 'react';
import Logo from './icons/logo.png';
import AddTask from './icons/task-list-add.png';
import Trashcan from './icons/trash.png';

import './App.css';

const STORAGE_KEY = 'todo:savedTasks';

function getCurrentDate(separator='-'){
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

function App() {
  const [newtask, setNewTask] = useState('');
  const [newdate, setNewDate] = useState(getCurrentDate());
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  const addTask = () =>{

    if(!newtask){
      alert("Enter a task!");
      return
    }

    let task = {
      id: Math.floor(Math.random()*1000),
      value: newtask,
      due: newdate,
      done: false
    };
    if (tasks==null){
      setTasks([task])
    }else{
      setTasks([...tasks, task])
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...tasks, task]));

    setNewTask('');
  }

  const deleteTask = (id) =>{
    const newArray = tasks.filter(item=>item.id!==id);
    setTasks(newArray);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newArray));
  }

  const checkTask = (id) =>{
    let newArray = [];
    for(let i in tasks){
      if(tasks[i].id===id){
        newArray.push({id:tasks[i].id, value:tasks[i].value, due:tasks[i].due, done:!tasks[i].done});
      }else{
        newArray.push(tasks[i]);
      }
    }
    setTasks(newArray);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newArray));
  }

  return (
    <div className="App">
      <div className="header">
        <img src={Logo} alt='logo'/>
        <p>TODOZ</p>
      </div>

      <div className="input-container">
        <input 
        className='task-input'
        type='text' 
        placeholder='Enter a task...' 
        value={newtask}
        onChange={e=>{setNewTask(e.target.value)}} />
        <label>Due date:</label>
        <input 
        className='date-input'
        type='date'
        value={newdate}
        onChange={e=>{setNewDate(e.target.value)}} />
        <button onClick={()=>addTask()}><img src={AddTask} alt='Add task'/></button>
      </div>


      <div className="task-container">
        {(tasks!==null)&&tasks.map((item)=>{return <div className='task-item' key={item.id}>
          <input
          type='checkbox'
          checked={item.done}
          onChange={e=>checkTask(item.id)} 
          ></input>
          <p style={{textDecoration: (item.done)?'line-through':'none'}}>{item.value}</p>
          <button onClick={()=>deleteTask(item.id)}><img src={Trashcan} alt='delete'/></button>
        </div>})}
      </div>

      
    </div>
  );
}

export default App;
