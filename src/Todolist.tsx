import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState(" ")

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                         const onClickHandler = () => {
                             props.removeTasks(t.id)
                         }

                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHander}>All
                </button>
                <button onClick={onActiveClickHander}>Active
                </button>
                <button onClick={onCompletedClickHander}>Completed
                </button>
            </div>
        </div>
    )
}


