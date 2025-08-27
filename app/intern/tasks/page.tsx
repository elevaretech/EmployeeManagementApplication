"use client";

import { useState, useEffect } from "react";
import { tasks as initialTasks, Task, TaskStatus } from data/tasks";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Initialize tasks and update status based on due date
  useEffect(() => {
    const today = new Date();
    const updated = initialTasks.map((task) => {
      const dueDate = task.due ? new Date(task.due) : null;
      let status: TaskStatus = task.status ?? "Upcoming";

      if (dueDate && dueDate <= today && status === "Upcoming") {
        status = "Pending";
      }

      return { ...task, status };
    });
    setTasks(updated);
  }, []);

  // Toggle task status: Pending -> In Progress -> Completed
  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        switch (task.status) {
          case "Pending":
            return { ...task, status: "In Progress", progress: 30 };
          case "In Progress":
            return { ...task, status: "Completed", progress: 100 };
          default:
            return task;
        }
      })
    );
  };

  // Simple color coding for status
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "Pending":
        return "#f59e0b"; // amber
      case "In Progress":
        return "#3b82f6"; // blue
      case "Completed":
        return "#16a34a"; // green
      default:
        return "#6b7280"; // gray
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1
        style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}
      >
        My Tasks
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <h2 style={{ fontWeight: 500 }}>{task.title}</h2>
              {task.due && (
                <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  Due: {new Date(task.due).toLocaleDateString()}
                </p>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#fff",
                  backgroundColor: getStatusColor(task.status),
                }}
              >
                {task.status}
              </span>
              {(task.status === "Pending" || task.status === "In Progress") && (
                <button
                  onClick={() => handleToggle(task.id)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    fontWeight: 500,
                  }}
                >
                  {task.status === "Pending" ? "Start" : "Complete"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
