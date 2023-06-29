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

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add Task</button>

      <div>
        <h2>Active Tasks</h2>
        {tasks.map(
          (task) =>
            !task.completed && (
              <div key={task._id}>
                <p>{task.name}</p>
                <button onClick={() => completeTask(task._id)}>Complete</button>
              </div>
            )
        )}
      </div>

      <div>
        <h2>Completed Tasks</h2>
        {tasks.map(
          (task) =>
            task.completed && (
              <div key={task._id}>
                <p>{task.name}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
}
