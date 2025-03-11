import React,{useState} from "react"

const ToDo = () =>{

        const StoreTasks = () =>{
            const rawTodo = localStorage.getItem("Tasks")

            if(!rawTodo) return []

            return JSON.parse(rawTodo)
        }

    const [tasks , setTasks] = useState(StoreTasks)
    const [newTask , setNewTask] = useState('')

    const addTask = () =>{
        setTasks([...tasks,{id:Date.now(),text:newTask,completed:false}])
        setNewTask('')
    }

    // adding the task to local storage
    localStorage.setItem("Tasks", JSON.stringify(tasks))

    const handelKeyup = (e) =>{
        if(e.key === "Enter" && newTask !== ""){
            addTask()
            }
    }

    const handelClick = () =>{
        if(newTask !== ""){
            addTask()
            }
    }

    const DeleteTask = (i) =>{
        setTasks(tasks.filter((_,index) => i !== index))
    }

    const CompleteTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        )
    };

    const UpTask = (i) =>{
        if(i===0) return
        
        let updatedTasks = [...tasks];
        let temp = updatedTasks[i]
        updatedTasks.splice(i,1)
        updatedTasks.splice(i-1,0,temp)
        setTasks(updatedTasks)
    }
    const DownTask = (i) =>{
        let updatedTasks = [...tasks];
        let temp = updatedTasks[i]
        updatedTasks.splice(i,1)
        updatedTasks.splice(i+1,0,temp)
        setTasks(updatedTasks)
    }
      

    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="sm-m-0 m-3 max-w-md w-full rounded-2xl overflow-hidden flex flex-col items-center ">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 w-full">
                <h1 className="text-3xl font-bold text-white text-center">Todo List</h1>
            </div>
            <div className="flex gap-2 justify-center w-full mt-0.5 flex-wrap">
                <input
                className="rounded flex-1 p-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 m-0.5"
                type="text"
                value={newTask}
                placeholder="Enter task..."
                onChange={(e) => setNewTask(e.target.value)}
                onKeyUp={handelKeyup}
                />
                <button onClick={handelClick} className="bg-blue-500 text-white text-[1.2rem] px-4 py-2 rounded-lg hover:bg-blue-600 m-0.5">Add</button>
            </div>
            <div className="m-1 mt-5 sm:m-5 h-full w-full">
            <ul className="h-[500px] overflow-y-scroll [&::-webkit-scrollbar]:hidden"> 
                {tasks.map((task,index) =>
                <li key={task.id} >
                    <div className="flex justify-between bg-white mt-2 h-12 rounded-[4px] shadow-lg p-2">
                        <div className="flex items-center min-w-0">
                            <input 
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => CompleteTask(task.id)}
                            className="scale-120"
                        />
                        <div className="flex mr-2 ml-2 text-[1.1rem] whitespace-nowrap overflow-x-scroll [&::-webkit-scrollbar]:hidden"
                            style={{ textDecoration: task.completed ? 'line-through' : 'none',
                                     color:task.completed ? 'gray':'black'
                            }}>

                           <p>{task.text}</p>
                        </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => UpTask(index)}  className="bg-gray-300 text-black px-2 py-1 rounded-md hover:bg-gray-400">↑</button>
                            <button onClick={() => DownTask(index)}  className="bg-gray-300 text-black px-2 py-1 rounded-md hover:bg-gray-400" >↓</button>
                            <button onClick={() => DeleteTask(index)}  className="bg-red-500 text-black px-2 py-1 rounded-md hover:bg-red-400">Delete</button>
                        </div>
                    </div>
                </li>
                )}
            </ul>
            </div>
        </div>
        </div>
    )
    
}
export default ToDo