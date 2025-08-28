"use client";

import { useState, useEffect } from "react";
import { tasks as initialTasks, Task, TaskStatus } from "@/data/tasks";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Auto-assign statuses on load
  useEffect(() => {
    const today = new Date();

    const updated: Task[] = initialTasks.map((task) => {
      const due = task.due ? new Date(task.due) : null;

      if (!due) return { ...task, status: "Upcoming" as TaskStatus };

      if (due.toDateString() === today.toDateString()) {
        return { ...task, status: "Pending" as TaskStatus };
      } else if (due > today) {
        return { ...task, status: "Upcoming" as TaskStatus };
      } else {
        return { ...task, status: "Pending" as TaskStatus }; // past-due stays pending until completed manually
      }
    });

    setTasks(updated);
  }, []);

  // Handle status update for one task
  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        if (task.status === "Pending") {
          return { ...task, status: "In Progress" as TaskStatus };
        } else if (task.status === "In Progress") {
          return { ...task, status: "Completed" as TaskStatus, progress: 100 };
        } else {
          return task;
        }
      })
    );
  };

  const getStatusStyles = (status: TaskStatus) => {
    switch (status) {
      case "Upcoming":
        return "bg-gray-100 text-gray-600 border border-gray-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-300";
      default:
        return "";
    }
  };

  const getButtonLabel = (status: TaskStatus) => {
    if (status === "Pending") return "Start";
    if (status === "In Progress") return "Complete";
    return "—";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Employee Tasks</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
              <span
                className={`px-3 py-1 text-sm rounded-full ${getStatusStyles(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-2">
              Due: {task.due || "No deadline"}
            </p>

            {task.status !== "Upcoming" && task.status !== "Completed" && (
              <button
                onClick={() => handleToggle(task.id)}
                className="px-4 py-2 mt-3 text-sm font-medium rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
              >
                {getButtonLabel(task.status)}
              </button>
            )}

            {task.status === "Completed" && (
              <p className="text-sm font-medium text-green-600 mt-3">✔ Done</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
