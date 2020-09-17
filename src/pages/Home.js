import React, { useState } from "react";
import { data, statuses } from "../data";
import Drop from "../components/Drop";
import Target from "../components/Target";
import Todo from "../components/Todo";
import Form from "../components/Form";

function Home() {
    const [tasks, setTasks] = useState(data);

    const onDrop = (task, monitor, status) => {
        setTasks(prevState => {
            const newTasks = prevState
                .filter(t => t.id !== task.id)
                .concat({ id: task.id, title: task.title, content: task.content, status});
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

    function addTask(title, content) {
        const taskId = tasks.length + 1;
        const newTask = { id: taskId, title: title, content: content, status: "open" };
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
        <main>
            <Form addTask={addTask} />
            <div className={"row"}>
                {statuses.map(s => {
                    return(
                        <section key={s.status} className={"col-wrapper"}>
                            <h3 className={"col-header"}>{s.status.toUpperCase()}</h3>
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
                        </section>
                    )
                })}
            </div>
        </main>

    );
}

export default Home;
