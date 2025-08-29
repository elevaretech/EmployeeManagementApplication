"use client";

import { useState } from "react";

// Sample Data
const leaveApplications = [
  {
    id: 1,
    name: "Ali Khan",
    role: "Employee",
    type: "Sick Leave",
    start: "2025-08-20",
    end: "2025-08-22",
    reason: "Fever",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    role: "Team Lead",
    type: "Casual Leave",
    start: "2025-08-25",
    end: "2025-08-26",
    reason: "Personal",
    status: "Approved",
  },
];

const attendanceRecords = [
  {
    id: 1,
    name: "Ali Khan",
    role: "Employee",
    date: "2025-08-20",
    checkIn: "09:05 AM",
    checkOut: "05:00 PM",
    status: "Present",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    role: "Team Lead",
    date: "2025-08-20",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
  },
];

export default function LeaveAttendanceAdmin() {
  const [leaves, setLeaves] = useState(leaveApplications);
  const [filter, setFilter] = useState("All");

  const handleStatusChange = (id: number, newStatus: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const filteredLeaves =
    filter === "All" ? leaves : leaves.filter((l) => l.status === filter);

  return (
    <div className="p-6 space-y-8">
      {/* Leave Applications */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Leave Applications
        </h2>

        <div className="mb-4">
          <label className="mr-2 text-gray-700">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-2 text-gray-800"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-gray-700">Role</th>
                <th className="px-4 py-2 text-left text-gray-700">Leave Type</th>
                <th className="px-4 py-2 text-left text-gray-700">Start</th>
                <th className="px-4 py-2 text-left text-gray-700">End</th>
                <th className="px-4 py-2 text-left text-gray-700">Reason</th>
                <th className="px-4 py-2 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr key={leave.id} className="border-t">
                  <td className="px-4 py-2 text-gray-800">{leave.name}</td>
                  <td className="px-4 py-2 text-gray-800">{leave.role}</td>
                  <td className="px-4 py-2 text-gray-800">{leave.type}</td>
                  <td className="px-4 py-2 text-gray-800">{leave.start}</td>
                  <td className="px-4 py-2 text-gray-800">{leave.end}</td>
                  <td className="px-4 py-2 text-gray-800">{leave.reason}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded cursor-pointer ${
                        leave.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : leave.status === "Approved"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                      onClick={() =>
                        handleStatusChange(
                          leave.id,
                          leave.status === "Pending"
                            ? "Approved"
                            : leave.status === "Approved"
                            ? "Rejected"
                            : "Pending"
                        )
                      }
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Records */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Attendance Records
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-gray-700">Role</th>
                <th className="px-4 py-2 text-left text-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-gray-700">Check-In</th>
                <th className="px-4 py-2 text-left text-gray-700">Check-Out</th>
                <th className="px-4 py-2 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((att) => (
                <tr key={att.id} className="border-t">
                  <td className="px-4 py-2 text-gray-800">{att.name}</td>
                  <td className="px-4 py-2 text-gray-800">{att.role}</td>
                  <td className="px-4 py-2 text-gray-800">{att.date}</td>
                  <td className="px-4 py-2 text-gray-800">{att.checkIn}</td>
                  <td className="px-4 py-2 text-gray-800">{att.checkOut}</td>
                  <td className="px-4 py-2 text-gray-800">{att.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
