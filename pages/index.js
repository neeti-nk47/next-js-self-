import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const addTask = async () => {
    if (task.trim() !== "") {
      try {
        await axios.post("/api/tasks", { task });
        setTask("");
        fetchTasks();
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };

  const completeTask = async (taskId) => {
    try {
      await axios.put(`/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="container w-50 p-3 ">
      <div className="card bg-light">
        <h1 className="text-center">Todo App</h1>
        <div className="card-body text-center">
          <input
            className="form-control "
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button
            className=" form-control-sm btn btn-primary m-3"
            onClick={addTask}
          >
            Add Task
          </button>

          <div className="card p-3 mb-5 bg-tertiary">
            <h2>Active Tasks:</h2>
            {tasks.map(
              (task) =>
                !task.completed && (
                  <ul className="list-group" key={task._id}>
                    <li className="list-group-item">
                      {task.name}{" "}
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => completeTask(task._id)}
                      >
                        Completed
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                )
            )}
          </div>

          <div className="card p-3 mb-5 ">
            <h2>Completed Tasks:</h2>
            {tasks.map(
              (task) =>
                task.completed && (
                  <ul className="list-group" key={task._id}>
                    <li className="list-group-item">{task.name}</li>
                  </ul>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
