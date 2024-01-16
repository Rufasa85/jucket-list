import { useState,useEffect } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm';
import AuthForm from './AuthForm';
import API from "../utils/API"



function App() {
  const [todos, setTodos] = useState([])

const [isLoggedIn, setIsLoggedIn] = useState(false);
const [token, setToken] = useState("");
const [userEmail, setUserEmail] = useState("")


useEffect(()=>{
  fetch("http://localhost:3000/api/todos",{
    headers:{
      Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2VAam9lLmpvZSIsImlhdCI6MTcwNTM2Mzc0NSwiZXhwIjoxNzA1MzcwOTQ1fQ.BNHKqUzTTsNnLPPlY6wpQTMObbgv2G0qpAYvpszErAg`
    }
  }).then(res=>res.json()).then(data=>{
    console.log('data', data)
  })
},[])

useEffect(()=>{
  const savedToken = localStorage.getItem("token");
  if(savedToken){
    API.getDataFromToken(savedToken).then(userData=>{
      setToken(savedToken);
      setUserEmail(userData.email);
      setTodos(userData.Todos);
      setIsLoggedIn(true)
    }).catch(err=>{
      localStorage.removeItem("token");
    })
  }
},[])

//auth methods
const handleLogin = userObj=>{
  API.login({
    email:userObj.email,
    password:userObj.password,
}).then(data=>{
    console.log(data);
    setIsLoggedIn(true);
    setToken(data.token);
    setUserEmail(data.user.email)
    setTodos(data.user.Todos)
    localStorage.setItem("token",data.token)
}).catch(err=>{
    console.log(err);
})
}
const handleSignup = userObj=>{
  API.signup({
    email:userObj.email,
    password:userObj.password,
}).then(data=>{
    console.log(data);
    setIsLoggedIn(true);
    setToken(data.token);
    setUserEmail(data.user.email)
    setTodos(data.user.Todos)
    localStorage.setItem("token",data.token)
}).catch(err=>{
    console.log(err);
})
}
const logout = ()=>{
  setToken("");
  setUserEmail("");
  setTodos([]);
  setIsLoggedIn(false);
  localStorage.removeItem("token")
}


//todo methods
const addTodo = todObj=>{
  API.createTodo(token,todObj).then(newTodo=>{
    API.getTodos(token).then(allTodos=>{
      setTodos(allTodos)
    }).catch(err=>{
      console.log(err)
    })
  }).catch(err=>{
    console.log(err)
  })
}

const editTodo = (id,obj)=>{
  API.editTodo(token,id,obj).then((data)=>{
    API.getTodos(token).then(allTodos=>{
      setTodos(allTodos)
    }).catch(err=>{
      console.log(err)
    })
  }).catch(err=>{
    console.log(err)
  })

}

const toggleComplete = (id,comp)=>{
  API.editTodo(token,id,{complete:!comp}).then((data)=>{
    API.getTodos(token).then(allTodos=>{
      setTodos(allTodos)
    }).catch(err=>{
      console.log(err)
    })
  }).catch(err=>{
    console.log(err)
  })

}

const delTodo = id=>{
  API.deleteTodo(token,id).then((data)=>{
    API.getTodos(token).then(allTodos=>{
      setTodos(allTodos)
    }).catch(err=>{
      console.log(err)
    })
  }).catch(err=>{
    console.log(err)
  })
}

  return (
    <>
    {isLoggedIn?(
      <div>
        <h1>Hello {userEmail}<button onClick={logout}>logout</button></h1>
        <TodoForm addTodo={addTodo}/>
        {todos.map(tod=><Todo key={tod.id} id={tod.id} task={tod.task} priority= {tod.priority} complete = {tod.complete} delTodo={delTodo} editTodo={editTodo} toggleComplete={toggleComplete}/>)}
    </div>
      ):(
       <div>
        <AuthForm type="login" subHandle={handleLogin}/>
        <AuthForm type="signup" subHandle={handleSignup}/>
       </div>
      )
    }
    </>
  )
}

export default App
