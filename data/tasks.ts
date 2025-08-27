// data/tasks.ts
export type TaskStatus = "Upcoming" | "Pending" | "In Progress" | "Completed" | "Overdue";

export type Task = {
  id: string;
  title: string;
  due: string; // YYYY-MM-DD
  progress?: number; // 0-100
  status?: TaskStatus; // This will be set dynamically
};

export const tasks: Omit<Task, "status">[] = [
  {
    id: "1",
    title: "Complete Onboarding Documents",
    due: "2025-08-30",
    progress: 0,
  },
  {
    id: "2",
    title: "Build Authentication Module",
    due: "2025-09-05",
    progress: 40,
  },
  {
    id: "3",
    title: "Submit Weekly Report",
    due: "2025-09-01",
    progress: 0,
  },
];
