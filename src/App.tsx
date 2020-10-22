import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTask] = useState([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "C#", isDone: false},
        {id: 4, title: "C#", isDone: false},
        {id: 5, title: "C#", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("active");

    let taskForTodolist = tasks;
    if(filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone === true);
    }

    function removeTasks(id: number) {
       let filteredTasks = tasks.filter(t => t.id !== id);
       setTask(filteredTasks)
        console.log(tasks)
    }

    function changeFilter(value: "all" | "active" | "completed"){
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
