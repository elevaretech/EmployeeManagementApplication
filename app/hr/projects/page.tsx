// pages/hr/projects.tsx (if using Next.js/React)

"use client";
import { useState } from "react";

type Project = {
  id: string;
  name: string;
  lead: string;
  teamCount: number;
  startDate: string;
  endDate: string;
  status: "Ongoing" | "Completed" | "On Hold" | "Cancelled";
  progress: number; // 0-100
  priority: "Low" | "Medium" | "High";
};

const sampleProjects: Project[] = [
  {
    id: "1",
    name: "Project Alpha",
    lead: "Ali Khan",
    teamCount: 5,
    startDate: "2025-08-01",
    endDate: "2025-09-30",
    status: "Ongoing",
    progress: 70,
    priority: "High",
  },
  {
    id: "2",
    name: "Project Beta",
    lead: "Sara Ahmed",
    teamCount: 3,
    startDate: "2025-07-15",
    endDate: "2025-10-01",
    status: "On Hold",
    progress: 40,
    priority: "Medium",
  },
  {
    id: "3",
    name: "Project Gamma",
    lead: "Usman Tariq",
    teamCount: 4,
    startDate: "2025-06-20",
    endDate: "2025-08-31",
    status: "Completed",
    progress: 100,
    priority: "Low",
  },
];

export default function HRProjectsPage() {
  const totalProjects = sampleProjects.length;
  const ongoingProjects = sampleProjects.filter((p) => p.status === "Ongoing").length;
  const completedProjects = sampleProjects.filter((p) => p.status === "Completed").length;
  const pendingProjects = sampleProjects.filter((p) => p.status === "On Hold").length;

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Projects Overview</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-gray-700 font-medium">Total Projects</p>
          <p className="text-gray-800 font-bold text-xl">{totalProjects}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-gray-700 font-medium">Ongoing Projects</p>
          <p className="text-gray-800 font-bold text-xl">{ongoingProjects}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-gray-700 font-medium">Completed Projects</p>
          <p className="text-gray-800 font-bold text-xl">{completedProjects}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-gray-700 font-medium">Pending Projects</p>
          <p className="text-gray-800 font-bold text-xl">{pendingProjects}</p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Project Name</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Team Lead</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Team Members</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Start Date</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">End Date</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Status</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Progress</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Priority</th>
            </tr>
          </thead>
          <tbody>
            {sampleProjects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-800">{project.name}</td>
                <td className="py-3 px-4 text-gray-800">{project.lead}</td>
                <td className="py-3 px-4 text-gray-800">{project.teamCount}</td>
                <td className="py-3 px-4 text-gray-800">{project.startDate}</td>
                <td className="py-3 px-4 text-gray-800">{project.endDate}</td>
                <td className={`py-3 px-4 font-semibold ${
                  project.status === "Ongoing" ? "text-green-600" :
                  project.status === "Completed" ? "text-blue-600" :
                  project.status === "On Hold" ? "text-yellow-600" :
                  "text-red-600"
                }`}>{project.status}</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded h-4">
                    <div
                      className={`h-4 rounded ${
                        project.progress > 70 ? "bg-green-500" :
                        project.progress > 40 ? "bg-yellow-400" :
                        "bg-red-500"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-700 text-sm mt-1">{project.progress}%</p>
                </td>
                <td className={`py-3 px-4 font-medium ${
                  project.priority === "High" ? "text-red-600" :
                  project.priority === "Medium" ? "text-yellow-600" :
                  "text-green-600"
                }`}>{project.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional: Add a chart later */}
      <div className="mt-8 p-4 bg-white shadow rounded">
        <h2 className="text-gray-800 font-semibold mb-4">Progress Chart (Optional)</h2>
        <div className="w-full h-64 flex items-center justify-center text-gray-400">
          Chart will go here
        </div>
      </div>
    </div>
  );
}
