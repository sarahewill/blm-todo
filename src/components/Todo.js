import React, { Fragment, useRef, useState} from "react";
import {useDrop, useDrag} from "react-dnd";
import ITEM_TYPE from "../data/item";

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
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={task.id}>
                    New name for {task.title}
                </label>
                <input
                    id={task.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span className="visually-hidden">renaming {task.title}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">new name for {task.title}</span>
                </button>
            </div>
        </form>
    );
    const viewTemplate = (
        <Fragment>
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"item"}
            >
                <div className={"color-bar"} style={{ backgroundColor: status.color }}/>
                <p className={"item-title"}>{task.title}</p>
                <p className={"item-status"}>{task.icon}</p>
                <div className="btn-group">
                    <button type="button" className="btn" onClick={() => setEditing(true)}>
                        Edit <span className="visually-hidden">{task.title}</span>
                    </button>
                    <button
                        type="button"
                        className="btn btn__danger"
                        onClick={() => deleteTask(task.id)}
                    >
                        Delete <span className="visually-hidden">{task.name}</span>
                    </button>
                </div>
            </div>
        </Fragment>
    );
    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
