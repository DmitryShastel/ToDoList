import React, {ChangeEvent, useCallback, useState} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string,) => void
    filter: FilterValuesType
    //tasks: Array<TaskType>
    //removeTasks: (taskId: string, todolistId: string) => void
    //addTask: (title: string, todolistId: string) => void
    //changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    //changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void

}

export const Todolist = React.memo((props: PropsType) => {
    console.log('ToDoList called')

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch();

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    },
        [props.id, props.changeTodolistTitle])

    const onAllClickHander = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [])
    const onActiveClickHander = useCallback(() => {
        props.changeFilter("active", props.id)
    },[])
    const onCompletedClickHander = useCallback(() => {
        props.changeFilter("completed", props.id)
    },[])

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={(title) => {
                const action = addTaskAC(title, props.id);
                dispatch(action);
            }}/>
            <div>
                {
                    tasksForTodolist.map(t => {
                        const onClickHandler = () => {
                            const action = removeTaskAC(t.id, props.id);
                            dispatch(action);
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            const action = changeTaskStatusAC(t.id, newIsDoneValue, props.id);
                            dispatch(action);
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            const action = changeTaskTitleAC(t.id, newValue, props.id);
                            dispatch(action);
                        }

                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                color="secondary"
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? "outlined" : "text"}
                    onClick={onAllClickHander}
                    color={"default"}>
                    All
                </Button>
                <Button
                    variant={props.filter === 'active' ? "outlined" : "text"}
                    onClick={onActiveClickHander}
                    color={"secondary"}>
                    Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? "outlined" : "text"}
                    onClick={onCompletedClickHander}
                    color={"inherit"}>
                    Completed
                </Button>
            </div>
        </div>
    )
})





