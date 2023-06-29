import connectDB from "../../../db";
import Task from "../../../models/Task";

connectDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const tasks = await Task.find({});
      res.status(200).json({ tasks });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  } else if (req.method === "POST") {
    const { task } = req.body;
    try {
      const newTask = new Task({ name: task });
      await newTask.save();
      res.status(201).json({ message: "Task added successfully" });
    } catch (error) {
      console.error("Failed to add task:", error);
      res.status(500).json({ message: "Failed to add task" });
    }
  } else if (req.method === "DELETE") {
    const { taskId } = req.query;
    try {
      await Task.findByIdAndRemove(taskId);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Failed to delete task:", error);
      res.status(500).json({ message: "Failed to delete task" });
    }
  } else if (req.method === "PUT") {
    const { taskId } = req.query;
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { completed: true },
        { new: true }
      );
      res.status(200).json({ message: "Task marked as completed", task });
    } catch (error) {
      console.error("Failed to mark task as completed:", error);
      res.status(500).json({ message: "Failed to mark task as completed" });
    }
  }
}
