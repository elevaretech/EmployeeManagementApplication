"use client";
import { useState } from "react";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  time: string;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Task Assigned",
    message: "You have been assigned a new task by your team lead.",
    type: "info",
    read: false,
    time: "2 min ago",
  },
  {
    id: "2",
    title: "Attendance Marked",
    message: "Your attendance for today has been successfully marked.",
    type: "success",
    read: true,
    time: "1 hr ago",
  },
  {
    id: "3",
    title: "Policy Update",
    message: "Elevare Tech policy has been updated. Please review it.",
    type: "warning",
    read: false,
    time: "3 hrs ago",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "warning":
        return <AlertCircle className="text-yellow-500 w-5 h-5" />;
      case "error":
        return <AlertCircle className="text-red-500 w-5 h-5" />;
      default:
        return <Info className="text-blue-500 w-5 h-5" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" /> Notifications
        </h1>
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-red-500 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center text-slate-500 py-10">
          <Bell className="w-10 h-10 mx-auto mb-2 text-slate-400" />
          No new notifications
        </div>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-4 rounded-xl border flex gap-3 items-start ${
                n.read ? "bg-white border-slate-200" : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="mt-1">{getIcon(n.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="font-medium text-slate-800">{n.title}</h2>
                  <span className="text-xs text-slate-400">{n.time}</span>
                </div>
                <p className="text-sm text-slate-600">{n.message}</p>
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="mt-2 text-xs text-blue-600 hover:underline"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
