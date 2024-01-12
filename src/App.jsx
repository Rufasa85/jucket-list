import { useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm';


function App() {
  const [todos, setTodos] = useState([{
    id:1,
    task:"nap",
    priority:"high",
    complete:false
},{
  id:2,
  task:"eat",
  priority:"high",
  complete:true
},
{
  id:3,
  task:"learn",
  priority:"low",
  complete:false
}])

const addTodo = todObj=>{
  todObj.id= todos[0]?todos[todos.length-1].id+1:1;
  setTodos([...todos,todObj])
}

const editTodo = (id,obj)=>{
  console.log("edit me!");
  console.log('id', id)
  console.log('obj', obj)
  const todosCopy = [...todos];
  const idx = todosCopy.findIndex(tod=>tod.id==id);
  todosCopy.splice(idx,1,obj)
  console.log('todoCopy', todosCopy)
  setTodos(todosCopy)
}

const delTodo = id=>{
  const filteredTodos = todos.filter(tod=>tod.id!=id);
  setTodos(filteredTodos)
}
const toggleComplete = id=>{
  const todosCopy = [...todos];
  todosCopy.forEach(tod=>{
    if(tod.id==id){
      tod.complete= !tod.complete
    }
  })
  setTodos(todosCopy)
}

  return (
    <>
      <h1>Hello</h1>
      <TodoForm addTodo={addTodo}/>
      {todos.map(tod=><Todo key={tod.id} id={tod.id} task={tod.task} priority= {tod.priority} complete = {tod.complete} delTodo={delTodo} editTodo={editTodo} toggleComplete={toggleComplete}/>)}
      
    </>
  )
}

export default App
