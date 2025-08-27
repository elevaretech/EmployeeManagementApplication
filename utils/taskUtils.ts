// utils/taskUtils.ts
import { Task, TaskStatus } from "@/data/tasks";

export function getTaskStatus(task: Task): TaskStatus {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  if (task.status === "In Progress" || task.status === "Completed") {
    return task.status; // manual override
  }

  if (task.due === today) {
    return "Pending";
  }

  if (task.due > today) {
    return "Upcoming";
  }

  return "Overdue";
}

export function processTasks(tasks: Task[]): Task[] {
  return tasks.map((task) => ({
    ...task,
    status: getTaskStatus(task),
  }));
}
