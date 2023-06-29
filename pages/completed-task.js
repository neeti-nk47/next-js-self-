import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get("/api/tasks/completed");
      setCompletedTasks(response.data.tasks);
    } catch (error) {
      console.error("Failed to fetch completed tasks:", error);
    }
  };

  return (
    <div className="container card w-50 p-3 mt-3 text-center ">
      <h2>Completed Tasks</h2>
      {completedTasks.length > 0 ? (
        <ul className="list-group card-body p-3">
          {completedTasks.map((task) => (
            <li className="list-group-item" key={task._id}>
              {task.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed tasks found.</p>
      )}
      <Link href="/">Go back to Task List</Link>
    </div>
  );
};

export default CompletedTasks;
