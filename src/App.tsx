import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let tasks1 = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "C#", isDone: false}
    ]

    let tasks2 = [
        {id: 1, title: "Pop", isDone: true},
        {id: 2, title: "Rock", isDone: false},
        {id: 3, title: "Metall", isDone: false}
    ]



    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="Songs" tasks={tasks2}/>
        </div>
    );
}

export default App;
