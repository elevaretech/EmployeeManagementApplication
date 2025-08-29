"use client";

import { useEffect, useState } from "react";

/* Notification type */
type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  role: "Employee" | "Team Lead" | "HR" | "Admin";
};

type Role = "Employee" | "Team Lead" | "HR" | "Admin";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState<Role>("Employee");

  useEffect(() => {
    // Fetch notifications (replace with API)
    const mockData: Notification[] = [
      {
        id: "1",
        title: "System Update",
        message: "The system will be down for maintenance at 10 PM.",
        date: "2025-08-29",
        role: "Employee",
      },
      {
        id: "2",
        title: "New Project Assigned",
        message: "You have been assigned a new project by Admin.",
        date: "2025-08-28",
        role: "Team Lead",
      },
    ];
    setNotifications(mockData);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotification: Notification = {
      id: (notifications.length + 1).toString(),
      title,
      message,
      date: new Date().toISOString().split("T")[0],
      role,
    };
    setNotifications([newNotification, ...notifications]);
    setTitle("");
    setMessage("");
    setRole("Employee");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-700 mb-6">Notifications</h1>

      {/* Send Notification Form */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="font-semibold text-lg mb-4 text-slate-500">Send New Notification</h2>
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full text-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded p-2 w-full text-slate-600"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Send To</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="border rounded p-2 w-full text-slate-600"
            >
              <option value="Employee">Employee</option>
              <option value="Team Lead">Team Lead</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send Notification
          </button>
        </form>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4 text-slate-500">All Notifications</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr key={n.id} className="hover:bg-gray-50 text-slate-500">
                  <td className="px-4 py-2 border">{n.title}</td>
                  <td className="px-4 py-2 border">{n.message}</td>
                  <td className="px-4 py-2 border">{n.role}</td>
                  <td className="px-4 py-2 border">{n.date}</td>
                </tr>
              ))}
              {notifications.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                    No notifications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
