"use client";
import { useState } from "react";

export default function LeaveApplicationForm() {
  const [form, setForm] = useState({
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ Send this to API: HR/admin will receive
    console.log("Leave application submitted:", form);
    alert("Leave application submitted!");
    setForm({ leaveType: "Casual", startDate: "", endDate: "", reason: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6 text-slate-800">Leave Application</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4 max-w-md">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
          <select
            name="leaveType"
            value={form.leaveType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
          >
            <option>Casual</option>
            <option>Sick</option>
            <option>Earned</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Reason</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit Leave
        </button>
      </form>
    </div>
  );
}
