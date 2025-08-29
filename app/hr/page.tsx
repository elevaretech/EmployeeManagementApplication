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

/** LocalStorage Keys */
const TEAM_KEY = "elevare_team_interns";
const PROJECTS_KEY = "elevare_team_projects";

/** HR Dashboard */
export default function HRDashboardPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [teamLeads, setTeamLeads] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const rawEmployees = localStorage.getItem(TEAM_KEY);
    if (rawEmployees) setEmployees(JSON.parse(rawEmployees));

    const rawProjects = localStorage.getItem(PROJECTS_KEY);
    if (rawProjects) setProjects(JSON.parse(rawProjects));

    // Separate team leads
    if (rawEmployees) {
      const all = JSON.parse(rawEmployees);
      setTeamLeads(all.filter((e: any) => e.role === "teamlead"));
    }
  }, []);

  // Derived Stats
  const ongoingProjects = projects.filter((p) => p.status !== "Completed").length;

  const topPerformers = [...employees]
    .sort((a, b) => (b.performance || 0) - (a.performance || 0))
    .slice(0, 5);

  // Mock attendance % for last 7 days
  const attendanceData = Array.from({ length: 7 }).map((_, i) => ({
    day: `Day ${i + 1}`,
    attendance: Math.floor(Math.random() * 20 + 80), // random 80-100%
  }));

  const COLORS = ["#54b7f4", "#82ca9d", "#ffc658", "#ff7f7f", "#a569bd"];

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="text-sm text-slate-500 font-semibold">Total Employees</div>
          <div className="mt-3 text-3xl font-bold text-blue-400">{employees.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="text-sm text-slate-500 font-semibold">Team Leads</div>
          <div className="mt-3 text-3xl font-bold text-blue-400">{teamLeads.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="text-sm text-slate-500 font-semibold">Ongoing Projects</div>
          <div className="mt-3 text-3xl font-bold text-blue-400">{ongoingProjects}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="text-sm text-slate-500 font-semibold">Top Performer</div>
          <div className="mt-3 text-3xl font-bold text-blue-400">
            {topPerformers.length ? topPerformers[0].name : "N/A"}
          </div>
        </div>
      </section>

      {/* Attendance Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h3 className="text-lg font-semibold mb-4 text-black">Attendance Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#54b7f4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Performers Pie */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h3 className="text-lg font-semibold mb-4 text-black">Top 5 Performers</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={topPerformers}
                dataKey="performance"
                nameKey="name"
                outerRadius={100}
                label
              >
                {topPerformers.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
