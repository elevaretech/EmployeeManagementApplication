export type TaskStatus = "Upcoming" | "Pending" | "In Progress" | "Completed" | "Overdue";

export type Task = {
  id: string;
  title: string;
  due: string; // YYYY-MM-DD
  progress?: number; // 0-100
  status: TaskStatus; // 👈 make it REQUIRED, not optional
};

export const tasks: Task[] = [
  {
    id: "1",
    title: "Complete Onboarding Documents",
    due: "2025-08-27",
    progress: 0,
    status: "Upcoming", // 👈 set default
  },
  {
    id: "2",
    title: "Complete Onboarding Documents",
    due: "2025-08-28",
    progress: 0,
    status: "Upcoming", // 👈 set default
  },{
    id: "3",
    title: "Complete Onboarding Documents",
    due: "2025-08-30",
    progress: 0,
    status: "Upcoming", // 👈 set default
  },
  {
    id: "4",
    title: "Build Authentication Module",
    due: "2025-09-05",
    progress: 40,
    status: "Upcoming",
  },
  {
    id: "5",
    title: "Submit Weekly Report",
    due: "2025-09-01",
    progress: 0,
    status: "Upcoming",
  },
];
