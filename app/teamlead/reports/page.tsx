"use client";

import { useState } from "react";

type Report = {
  id: string;
  internName: string;
  role: string;
  tasksAssigned: number;
  tasksCompleted: number;
  tasksPending: number;
};

const ReportsPage = () => {
  const [reports] = useState<Report[]>([
    {
      id: "1",
      internName: "Ali Raza",
      role: "Frontend Intern",
      tasksAssigned: 10,
      tasksCompleted: 7,
      tasksPending: 3,
    },
    {
      id: "2",
      internName: "Sara Khan",
      role: "Backend Intern",
      tasksAssigned: 8,
      tasksCompleted: 5,
      tasksPending: 3,
    },
  ]);

  // Summary Data
  const totalInterns = reports.length;
  const totalTasks = reports.reduce((sum, r) => sum + r.tasksAssigned, 0);
  const completedTasks = reports.reduce((sum, r) => sum + r.tasksCompleted, 0);
  const pendingTasks = reports.reduce((sum, r) => sum + r.tasksPending, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800">Reports</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Team members</h2>
          <p className="text-2xl font-bold text-blue-600">{totalInterns}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Tasks</h2>
          <p className="text-2xl font-bold text-green-600">{totalTasks}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Completed</h2>
          <p className="text-2xl font-bold text-purple-600">{completedTasks}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Pending</h2>
          <p className="text-2xl font-bold text-red-600">{pendingTasks}</p>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Team Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-slate-500">
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Role</th>
                <th className="px-4 py-2 border-b">Assigned</th>
                <th className="px-4 py-2 border-b">Completed</th>
                <th className="px-4 py-2 border-b">Pending</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 text-slate-500">
                  <td className="px-4 py-2 border-b">{report.internName}</td>
                  <td className="px-4 py-2 border-b">{report.role}</td>
                  <td className="px-4 py-2 border-b">{report.tasksAssigned}</td>
                  <td className="px-4 py-2 border-b text-green-600">
                    {report.tasksCompleted}
                  </td>
                  <td className="px-4 py-2 border-b text-red-600">
                    {report.tasksPending}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow">
          Export Report
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;
