import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "C#", isDone: false},
        {id: v1(), title: "C#", isDone: false},
        {id: v1(), title: "C#", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let taskForTodolist = tasks;
    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone === true);
    }

    function removeTasks(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
        console.log(tasks)
    }

    function changeFilter(value: "all" | "active" | "completed") {
        setFilter(value);
    }

    function addTask(title: string) {
        let task = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />

        </div>
    );
}

export default App;
