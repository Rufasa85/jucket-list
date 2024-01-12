import React, {useEffect, useState} from 'react'
import "./style.css"

export default function TodoForm(props) {
    const [task, setTask] = useState(props.task||"");
    const [priority, setPriority] = useState(props.priority||"med");

    const handleSub = e=>{
        e.preventDefault();
        if(!task){
            return
        }
        const todoObj = {
            task:task,
            priority:priority,
            complete:props.complete?true:false
        }
        if(props.id){
            todoObj.id=props.id;
            props.addTodo(props.id,todoObj)
            props.close();
        } else {
            props.addTodo(todoObj);
            setTask("");
            setPriority("med")
        }
    }
  return (
    <form className="TodoForm" onSubmit={handleSub}>
        <input value={task} onChange={e=>setTask(e.target.value)}/>
        <select value={priority} onChange={e=>setPriority(e.target.value)}>
            <option value="low">low priority</option>
            <option value="med">medium priority</option>
            <option value="high">high priority</option>
        </select>
        <button>Add Todo</button>
    </form>
  )
}
