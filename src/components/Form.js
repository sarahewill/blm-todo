import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

function Form(props) {
    const [name, setName] = useState('title');
    const [content, setContent] = useState('content');
    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name, content);
        setName("");
        setContent("");
        document.getElementById('todo-form').reset();
    }
    function updateTitle(e) {
        setName(e.target.value);
    }
    function updateContent(e) {
        setContent(e.target.value);
    }
    return(
        <form onSubmit={handleSubmit} id="todo-form">
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done to make Black Lives Matter?
                </label>
            </h2>
            <div className={"input-container"}>
                <TextField
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="title"
                    autoComplete="off"
                    placeholder={name}
                    variant="filled"
                    onChange={updateTitle}
                />
                <TextField
                    type="text"
                    id="new-todo-content"
                    className="input input__lg"
                    name="content"
                    autoComplete="off"
                    placeholder={content}
                    variant="filled"

                    onChange={updateContent}
                />
                <Button type="submit" variant="contained"  color="primary" className="btn btn__primary btn__lg">
                    Add
                </Button>
            </div>
        </form>
    )

}

export default Form;
