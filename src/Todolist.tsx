import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string,) => void
    filter:FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState(" ")
    let [error, setError] = useState<string | null>(null)

    const addTask = (title: string) => {
        if (title.trim() !== "") {
            props.addTask(title, props.id);
            setTitle("");
        } else {
            setError("Title is requared");
        }
    };
    const onAllClickHander = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHander = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHander = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}  />
                <button onClick={removeTodolist}>x</button></h3>

           <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                         const onClickHandler = () => {
                             props.removeTasks(t.id, props.id)
                         }
                         const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                             let newIsDoneValue = e.currentTarget.checked;
                             props.changeStatus(t.id, newIsDoneValue, props.id)
                         }
                         const onChangeTitleHandler = (newValue: string) => {
                             props.changeTaskTitle(t.id, newValue, props.id);
                         }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                            onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title}
                            onChange={onChangeTitleHandler}/>
                            <button onClick={onClickHandler}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHander}>
                    All
                </button>
                <button
                    className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHander}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHander}>Completed
                </button>
            </div>
        </div>
    )
}


