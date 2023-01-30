    import React, { useState, useEffect } from "react";

    const TaskTable = () => {
        const [tasks, setTasks] = useState([]);
        const [task, setTask] = useState({ taskName: "", status: "todo" });
        const [editingTask, setEditingTask] = useState(null);

        useEffect(() => {
            const storedTasks = localStorage.getItem("tasks");
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        }, []);

        

        const handleChange = e => {
            setTask({ ...task, [e.target.name]: e.target.value });
            
        };

        const handleAdd = e => {
            e.preventDefault();
            setTasks([...tasks, task]); 
            localStorage.setItem("tasks", JSON.stringify([...tasks, task]));           
            setTask({ taskName: "", status: "todo" });
            

            

        };

        const handleEdit = task => {
            setEditingTask(task);
            setTask({ ...task });          
            

        };

    
        const handleSave = e => {
            e.preventDefault();
            let tasksCopy = [...tasks];
            const index = tasksCopy.findIndex(task => task === editingTask);
            tasksCopy[index] = task;
            setTasks(tasksCopy);
            setEditingTask(null);
            setTask({ taskName: "", status: "todo" });
            localStorage.setItem("tasks", JSON.stringify(tasksCopy));
        };

        const handleRemove = taskToRemove => {
            setTasks(prevTasks => {
                const updatedTasks = prevTasks.filter(task => task !== taskToRemove);
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                return updatedTasks;
            });
        };


        return (
            <div class = "p-6 bg-[#FFF1E0] bg-cover h-screen w-screen flex flex-col" >
            <div>
            <h1 class = "font-bold text-5xl text-center text-black ">TODO APP</h1>
            </div>         
            <div className="m-6 flex flex-col items-center justify-center">
            <div className="my-4">
                    <form onSubmit={editingTask ? handleSave : handleAdd}>
                        <div className="flex">
                            <input
                                className="border p-2 mr-2"
                                type="text"
                                name="taskName"
                                placeholder="Task Name"
                                value={task.taskName}
                                onChange={handleChange}
                            />
                            <select
                                className="border p-2 mr-2"
                                name="status"
                                value={task.status}
                                onChange={handleChange}
                            >
                                <option value="todo">To-Do</option>
                                <option value="inprogress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button
                            className={`bg-${ editingTask ? "green-500" : "blue-500"} hover:bg-${editingTask ? "green-700" : "blue-700"} text-white py-2 px-4 rounded`}
                            type="submit" 
                            >
                            {editingTask ? "Save" : "Add"}
                            </button>
                        </div>
                    </form>
                </div >
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Task Name</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Edit</th>
                            <th className="px-4 py-2">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.taskName} className="text-center">
                                <td className="border px-4 py-2">{task.taskName}</td>
                                <td className={`p-2 border-2 border ${task.status === 'todo' ? 'border-red-500' : task.status === 'inprogress' ? 'border-yellow-500' : 'border-green-500'}`}>{task.status}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                        onClick={() => handleEdit(task)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                        onClick={() => handleRemove(task)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div >
            </div>
    );
    };

    export default TaskTable;
            







