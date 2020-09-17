import React, { Fragment, useRef, useState} from "react";
import {useDrop, useDrag} from "react-dnd";
import ITEM_TYPE from "../data/item";
import Button from "@material-ui/core/Button";

const Todo = ({ task, index, moveItem, deleteTask, editTask, status }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(task, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = task.index;
            const hoverIndex = index;
            console.log('index', dragIndex, hoverIndex)

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            task.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPE, ...task, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    function handleChange(e) {
        setNewName(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        editTask(task.id, newName);
        setNewName("");
        setEditing(false);
    }
    const editingTemplate = (
        <Fragment>
            <form className={'form-container'} onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        id={task.id}
                        className="todo-text"
                        type="text"
                        value={newName}
                        onChange={handleChange}
                    />
                </div>
                <div className="btn-group">
                    <Button
                        type="button"
                        className="btn todo-cancel"
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                        <span className="visually-hidden">renaming {task.title}</span>
                    </Button>
                    <Button type="submit" className="btn btn__primary todo-edit">
                        Save
                        <span className="visually-hidden">new name for {task.title}</span>
                    </Button>
                </div>
            </form>
        </Fragment>
    );
    const viewTemplate = (
        <Fragment>
            <h3 className={"task-title"}>{task.title}</h3>
            <span>{task.content}</span>
            <div className="btn-group">
                <Button onClick={() => setEditing(true)}>
                    Edit
                </Button>
                <Button
                    onClick={() => deleteTask(task.id)}
                >
                    Delete
                </Button>
            </div>
        </Fragment>
    );
    return <div className="todo">
                <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"task"}
                >
                    <div className={"color-bar"} style={{ backgroundColor: status.color }}/>
                    <div className={"task-container"}>

                        {isEditing ? editingTemplate : viewTemplate}

                    </div>
                </div>
        </div>;
}

export default Todo;
