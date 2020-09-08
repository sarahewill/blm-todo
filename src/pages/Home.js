import '../App.css';
import React, { useState } from "react";
import { data, statuses } from "../data";
import Drop from "../components/Drop";
import Target from "../components/Target";
import Todo from "../components/Todo";
import Form from "../components/Form";
function Home() {
    const [tasks, setTasks] = useState(data);

    const onDrop = (task, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);

        setTasks(prevState => {
            const newTasks = prevState
                .filter(t => t.id !== task.id)
                .concat({icon: mapping.icon, id: task.id, title: task.title, content: task.content, status});
            return [ ...newTasks];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = tasks[dragIndex];
        setTasks(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return  [ ...newItems ];
        });
    };

    function addTask(title) {
        const taskId = tasks.length + 1;
        const newTask = { id: taskId, title: title, status: "open" };
        setTasks([...tasks, newTask]);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter(task => id !== task.id)
        setTasks(remainingTasks)
    }

    function editTask(id, newName) {
        const editedTaskList = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                //
                return {...task, title: newName}
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    return (
        <div>
            <Form addTask={addTask} />
            <div className={"row"}>
                {statuses.map(s => {
                    return(
                        <div key={s.status} className={"col-wrapper"}>
                            <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                            <Drop onDrop={onDrop} status={s.status}>
                                <Target>
                                    {tasks
                                        .filter(t => t.status === s.status)
                                        .map((t, idx) =>
                                            <Todo key={t.id} task={t} index={idx}
                                                  moveItem={moveItem}
                                                  deleteTask={deleteTask}
                                                  editTask={editTask}
                                                  status={s} />)
                                    }
                                </Target>
                            </Drop>
                        </div>
                    )
                })}
            </div>
        </div>

    );
}

export default Home;
