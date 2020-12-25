import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskId: string) => void
    changeFilter: (value: "all" | "active" | "completed") => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter:FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState(" ")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title);
            setTitle("");
        } else {
            setError("Title is requared");
        }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const onAllClickHander = () => {
        props.changeFilter("all")
    }
    const onActiveClickHander = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHander = () => {
        props.changeFilter("completed")
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+
                </button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                         const onClickHandler = () => {
                             props.removeTasks(t.id)
                         }
                         const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                             let newIsDoneValue = e.currentTarget.checked;
                             props.changeTaskStatus(t.id, newIsDoneValue)
                         }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                            onChange={onChangeHandler}/>
                            <span>{t.title}</span>
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


