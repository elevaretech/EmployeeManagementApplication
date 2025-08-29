"use client";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type LeaveRequest = {
  id: number;
  name: string;
  team: string;
  from: string;
  to: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
};

const initialLeaveRequests: LeaveRequest[] = [
  { id: 1, name: "Talha Qureshi", team: "Web Dev", from: "2025-08-25", to: "2025-08-27", reason: "Vacation", status: "Pending" },
  { id: 2, name: "Ahmad Faizan", team: "Data Science", from: "2025-08-20", to: "2025-08-22", reason: "Medical", status: "Approved" },
  { id: 3, name: "Sara Khan", team: "Design", from: "2025-08-28", to: "2025-08-30", reason: "Personal", status: "Rejected" },
];

// Attendance data
const attendanceData = {
  labels: ["Aug 23", "Aug 24", "Aug 25", "Aug 26", "Aug 27", "Aug 28", "Aug 29"],
  datasets: [
    {
      label: "Attendance (%)",
      data: [95, 90, 92, 88, 97, 93, 91],
      backgroundColor: "#3B82F6",
    },
  ],
};

export default function LeaveAttendance() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);

  const toggleStatus = (id: number) => {
    setLeaveRequests((prev) =>
      prev.map((leave) => {
        if (leave.id === id) {
          let newStatus: LeaveRequest["status"];
          if (leave.status === "Pending") newStatus = "Approved";
          else if (leave.status === "Approved") newStatus = "Rejected";
          else newStatus = "Pending";
          return { ...leave, status: newStatus };
        }
        return leave;
      })
    );
  };

  const getStatusClass = (status: LeaveRequest["status"]) => {
    if (status === "Approved") return "text-green-600 cursor-pointer";
    if (status === "Rejected") return "text-red-600 cursor-pointer";
    return "text-yellow-600 cursor-pointer";
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Leave & Attendance</h1>

      {/* Leave Requests Table */}
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Leave Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700">Name</th>
                <th className="py-3 px-4 text-left text-gray-700">Team</th>
                <th className="py-3 px-4 text-left text-gray-700">From</th>
                <th className="py-3 px-4 text-left text-gray-700">To</th>
                <th className="py-3 px-4 text-left text-gray-700">Reason</th>
                <th className="py-3 px-4 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave) => (
                <tr key={leave.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-800">{leave.name}</td>
                  <td className="py-2 px-4 text-gray-800">{leave.team}</td>
                  <td className="py-2 px-4 text-gray-800">{leave.from}</td>
                  <td className="py-2 px-4 text-gray-800">{leave.to}</td>
                  <td className="py-2 px-4 text-gray-800">{leave.reason}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${getStatusClass(leave.status)}`}
                    onClick={() => toggleStatus(leave.id)}
                  >
                    {leave.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Chart */}
      <div>
        <h2 className="text-xl font-medium text-gray-800 mb-4">Attendance Overview (Last 7 Days)</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={attendanceData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
}
