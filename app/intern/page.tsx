"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/** Types */
type TaskStatus = "Upcoming" | "In Progress" | "Completed" | "Pending";

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  due?: string;
  progress?: number; // 0-100
};

type Project = {
  id: string;
  name: string;
  description?: string;
  leadName: string;
  leadEmail?: string;
  progress?: number;
};

type AttendanceEntry = {
  id: string;
  date: string; // yyyy-mm-dd
  shift: string;
  start: string; // HH:MM
  end: string; // HH:MM
  hours: number;
  tasksDone: number;
  note?: string;
};

/** LocalStorage Keys */
const TASKS_KEY = "elevare_internee_tasks";
const PROJECTS_KEY = "elevare_internee_projects";
const ATT_KEY = "elevare_internee_attendance";

/** Utility: calculate hours between HH:MM */
function calcHours(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startMinutes = sh * 60 + sm;
  let endMinutes = eh * 60 + em;

  if (endMinutes < startMinutes) endMinutes += 24 * 60; // handle overnight shifts

  const diff = endMinutes - startMinutes;
  return Math.round((diff / 60) * 100) / 100;
}

export default function InterneeDashboardPage() {
  /** State */
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [attendance, setAttendance] = useState<AttendanceEntry[]>([]);

  /** Load data from localStorage */
  useEffect(() => {
    const rawTasks = localStorage.getItem(TASKS_KEY);
    if (rawTasks) {
      setTasks(JSON.parse(rawTasks));
    } else {
      const demo: Task[] = [
        {
          id: "t1",
          title: "Complete project documentation",
          status: "In Progress",
          due: "2025-09-30",
          progress: 60,
        },
        {
          id: "t2",
          title: "Fix login page bug",
          status: "Completed",
          due: "2025-09-22",
          progress: 100,
        },
        {
          id: "t3",
          title: "Attend daily standup",
          status: "Upcoming",
          due: "2025-09-25",
          progress: 0,
        },
      ];
      setTasks(demo);
      localStorage.setItem(TASKS_KEY, JSON.stringify(demo));
    }

    const rawProjects = localStorage.getItem(PROJECTS_KEY);
    if (rawProjects) {
      setProjects(JSON.parse(rawProjects));
    } else {
      const demoProjects: Project[] = [
        {
          id: "p1",
          name: "Elevare Mobile App",
          description: "Mobile app revamp",
          leadName: "Ali Raza",
          leadEmail: "aliraza@elevare.com",
          progress: 45,
        },
      ];
      setProjects(demoProjects);
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(demoProjects));
    }

    const rawAtt = localStorage.getItem(ATT_KEY);
    if (rawAtt) setAttendance(JSON.parse(rawAtt));
  }, []);

  /** Derived stats */
  const totalAssigned = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const pendingCount = tasks.filter((t) => t.status !== "Completed").length;
  const todaysAttendance = attendance.find(
    (a) => a.date === new Date().toISOString().slice(0, 10)
  );

  // Attendance data for weekly chart
  const thisWeek = (() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
    return attendance.filter((a) => new Date(a.date) >= startOfWeek);
  })();

  const chartData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (day, i) => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + i);
      const iso = startOfWeek.toISOString().slice(0, 10);
      const entry = thisWeek.find((a) => a.date === iso);
      return { day, hours: entry ? entry.hours : 0 };
    }
  );

  /** UI */
  return (
    <div className="space-y-6">
      {/* Top stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tasks */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="text-sm text-slate-500 font-semibold">
            Assigned Tasks
          </div>
          <div className="mt-3 text-3xl font-bold text-[#54b7f4]">
            {totalAssigned}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Completed: {completedCount} • Pending: {pendingCount}
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="text-sm text-slate-500 font-semibold">
            Today&apos;s Attendance
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-700">
            {todaysAttendance ? `${todaysAttendance.hours} hrs` : "Not marked"}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            {todaysAttendance
              ? `${todaysAttendance.start} → ${todaysAttendance.end} (${todaysAttendance.shift})`
              : "You haven&apos;t marked your shift today."}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="text-sm text-slate-500 font-semibold">
            Active Projects
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-700">
            {projects.length}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Lead: {projects[0]?.leadName || "—"}
          </div>
        </div>
      </section>

      {/* New Dashboard Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Chart */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h3 className="text-lg font-semibold mb-4 text-black">
            Weekly Attendance
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#54b7f4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h3 className="text-lg font-semibold mb-3 text-black">
            Upcoming Deadlines
          </h3>
          {tasks
            .filter((t) => t.due && t.status !== "Completed")
            .sort((a, b) => (a.due! > b.due! ? 1 : -1))
            .slice(0, 3)
            .map((t) => (
              <div key={t.id} className="mb-3 p-3 border rounded-lg">
                <div className="font-medium text-slate-700">{t.title}</div>
                <div className="text-xs text-slate-400">Due: {t.due}</div>
              </div>
            ))}
          {tasks.filter((t) => t.due && t.status !== "Completed").length ===
            0 && (
            <div className="text-sm text-slate-500">
              No upcoming deadlines 🎉
            </div>
          )}
        </div>

        {/* Project Progress Overview */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h3 className="text-lg font-semibold mb-3 text-black">
            Project Progress
          </h3>
          {projects.map((p) => (
            <div key={p.id} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{p.name}</span>
                <span>{p.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-[#54b7f4]"
                  style={{ width: `${p.progress || 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Productivity Summary */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h3 className="text-lg font-semibold mb-3 text-black">
            This Month&apos;s Summary
          </h3>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg bg-gray-50">
              <div className="text-sm text-slate-500">Tasks Completed</div>
              <div className="text-xl font-bold text-slate-600">
                {completedCount}
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-gray-50">
              <div className="text-sm text-slate-500">Hours Logged</div>
              <div className="text-xl font-bold text-slate-600">
                {attendance.reduce((sum, a) => sum + a.hours, 0)}
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-gray-50">
              <div className="text-sm text-slate-500">Projects Active</div>
              <div className="text-xl font-bold text-slate-600">
                {projects.length}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
