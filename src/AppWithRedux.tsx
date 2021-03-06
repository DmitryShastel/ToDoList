import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch();


    //functions for todolists
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string)=> {
        const action = changeTodolistFilterAC(value, todolistId);
        dispatch(action)
    },[])
    const removeTodolist = useCallback((id: string) => {
     const action = removeTodolistAC(id);
        dispatch(action);
    }, [])
    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatch(action);
    }, [])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    removeTodolist={removeTodolist}
                                    changeFilter={changeFilter}
                                    filter={tl.filter}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;


