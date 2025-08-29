"use client";

import { useState } from "react";

type Holiday = { id: string; date: string; description: string };
type Role = { id: string; name: string };

export default function CompanySettings() {
  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "17:00",
    break: 60,
    flexible: false,
  });

  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: "1", date: "2025-12-25", description: "Quaid e Pakistan Birthday" },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "Employee" },
    { id: "2", name: "Team Lead" },
    { id: "3", name: "HR" },
  ]);

  const [newHoliday, setNewHoliday] = useState({ date: "", description: "" });

  const addHoliday = () => {
    if (newHoliday.date && newHoliday.description) {
      setHolidays([
        ...holidays,
        { id: (holidays.length + 1).toString(), ...newHoliday },
      ]);
      setNewHoliday({ date: "", description: "" });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-700 mb-6">Company Settings</h1>

      {/* Working Hours */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4 text-slate-800">Working Hours</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              value={workingHours.start}
              onChange={(e) =>
                setWorkingHours({ ...workingHours, start: e.target.value })
              }
              className="border rounded p-2 w-full text-slate-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">End Time</label>
            <input
              type="time"
              value={workingHours.end}
              onChange={(e) =>
                setWorkingHours({ ...workingHours, end: e.target.value })
              }
              className="border rounded p-2 w-full text-slate-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Break Duration (min)</label>
            <input
              type="number"
              value={workingHours.break}
              onChange={(e) =>
                setWorkingHours({ ...workingHours, break: parseInt(e.target.value) })
              }
              className="border rounded p-2 w-full text-slate-400"
            />
          </div>
          <div className="flex items-center mt-6 md:mt-0">
            <input
              type="checkbox"
              checked={workingHours.flexible}
              onChange={(e) =>
                setWorkingHours({ ...workingHours, flexible: e.target.checked })
              }
              className="mr-2 "
            />
            <span className="text-gray-700">Flexible Hours</span>
          </div>
        </div>
      </div>

      {/* Holidays */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4 text-slate-800">Holidays</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            value={newHoliday.date}
            onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
            className="border rounded p-2 w-full text-slate-400"
          />
          <input
            type="text"
            placeholder="Holiday Description"
            value={newHoliday.description}
            onChange={(e) =>
              setNewHoliday({ ...newHoliday, description: e.target.value })
            }
            className="border rounded p-2 w-full text-slate-400"
          />
          <button
            onClick={addHoliday}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Holiday
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((h) => (
                <tr key={h.id} className="hover:bg-gray-50 text-slate-500">
                  <td className="px-4 py-2 border">{h.date}</td>
                  <td className="px-4 py-2 border">{h.description}</td>
                  <td className="px-4 py-2 border">
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {holidays.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                    No holidays added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Default Roles */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4 text-gray-800">Default Roles</h2>
        <ul className="space-y-2">
          {roles.map((r) => (
            <li
              key={r.id}
              className="border p-3 rounded flex justify-between items-center text-slate-600"
            >
              <span>{r.name}</span>
              <button className="text-red-600 hover:underline">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Save / Reset */}
      <div className="flex justify-end gap-4">
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">
          Reset
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
