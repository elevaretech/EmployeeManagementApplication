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
  PieChart,
  Pie,
  Cell,
} from "recharts";

/** Types */
// type TaskStatus = "Upcoming" | "In Progress" | "Completed" | "Pending";

type Intern = {
  id: string;
  name: string;
  tasksCompleted: number;
  tasksPending: number;
  performance: number; // percentage 0–100
};

type Project = {
  id: string;
  name: string;
  progress: number; // %
  leadName: string;
  teamSize: number;
};

/** LocalStorage Keys */
const TEAM_KEY = "elevare_team_interns";
const PROJECTS_KEY = "elevare_team_projects";

export default function TeamLeadDashboardPage() {
  /** State */
  const [interns, setInterns] = useState<Intern[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  /** Load Data (later will come from DB) */
  useEffect(() => {
    const rawInterns = localStorage.getItem(TEAM_KEY);
    if (rawInterns) {
      setInterns(JSON.parse(rawInterns));
    } else {
      const demo: Intern[] = [
        {
          id: "i1",
          name: "Ali Khan",
          tasksCompleted: 12,
          tasksPending: 3,
          performance: 85,
        },
        {
          id: "i2",
          name: "Sara Ahmed",
          tasksCompleted: 8,
          tasksPending: 5,
          performance: 65,
        },
        {
          id: "i3",
          name: "John Doe",
          tasksCompleted: 15,
          tasksPending: 2,
          performance: 90,
        },
      ];
      setInterns(demo);
      localStorage.setItem(TEAM_KEY, JSON.stringify(demo));
    }

    const rawProjects = localStorage.getItem(PROJECTS_KEY);
    if (rawProjects) {
      setProjects(JSON.parse(rawProjects));
    } else {
      const demoProjects: Project[] = [
        {
          id: "p1",
          name: "Elevare Mobile App",
          progress: 60,
          leadName: "Ali Raza",
          teamSize: 3,
        },
        {
          id: "p2",
          name: "Website Revamp",
          progress: 35,
          leadName: "Sara Malik",
          teamSize: 2,
        },
      ];
      setProjects(demoProjects);
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(demoProjects));
    }
  }, []);

  /** Derived Stats */
  const totalInterns = interns.length;
  const avgPerformance = Math.round(
    interns.reduce((sum, i) => sum + i.performance, 0) / interns.length || 0
  );
  const totalProjects = projects.length;

  /** Chart Data */
  const performanceData = interns.map((i) => ({
    name: i.name,
    performance: i.performance,
  }));

  const COLORS = ["#54b7f4", "#82ca9d", "#ffc658", "#ff7f7f"];

  /** UI */
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="text-sm text-slate-500 font-semibold">
            Total Team members
          </div>
          <div className="mt-3 text-3xl font-bold text-[#54b7f4]">
            {totalInterns}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="text-sm text-slate-500 font-semibold">
            Average Performance
          </div>
          <div className="mt-3 text-3xl font-bold text-green-500">
            {avgPerformance}%
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="text-sm text-slate-500 font-semibold">
            Active Projects
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-700">
            {totalProjects}
          </div>
        </div>
      </section>

      {/* Charts & Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance Overview */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h3 className="text-lg font-semibold mb-4 text-black">
            Team Performance
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="performance" fill="#54b7f4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Progress */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h3 className="text-lg font-semibold mb-4 text-black">
            Project Progress
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={projects}
                dataKey="progress"
                nameKey="name"
                outerRadius={100}
                label
              >
                {projects.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Interns Detail List */}
        <div className="bg-white rounded-2xl p-6 shadow border col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-black">
            Team Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interns.map((i) => (
              <div key={i.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="font-medium text-slate-700">{i.name}</div>
                <div className="text-sm text-slate-500">
                  Completed: {i.tasksCompleted} • Pending: {i.tasksPending}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-full bg-[#54b7f4]"
                    style={{ width: `${i.performance}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Performance: {i.performance}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
