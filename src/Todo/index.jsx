import React,{useState} from 'react'
import "./style.css"
import TodoForm from '../TodoForm';

export default function Todo(props) {
    const [isEditing, setIsEditing] = useState(false)
    const delHandle = e=>{
        e.stopPropagation();
        props.delTodo(props.id)
    }
    const editHandle = e=>{
        e.stopPropagation();
        setIsEditing(true)
    }
  return (
    <div className={`Todo ${props.priority} ${props.complete?"complete":""}`} onClick={()=>props.toggleComplete(props.id)}>
        <h3>{props.task}</h3>
        <h4>Priority: {props.priority}</h4>
        <button onClick={editHandle}>Edit</button>
        <button onClick={delHandle}>Delete</button>
        {isEditing&&<TodoForm task={props.task} priority={props.priority} complete={props.complete} addTodo={props.editTodo} id={props.id} close={()=>setIsEditing(false)}/>}
    </div>
  )
}
