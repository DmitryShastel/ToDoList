import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan called')
    let [editMode, setEditeMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditMode = () =>{
        setEditeMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditeMode(false)
        props.onChange(title);
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
    ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>

})

















