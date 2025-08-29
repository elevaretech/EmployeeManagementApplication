"use client";

import { useState } from "react";

// Mock data
const stats = [
  { label: "Total Employees", value: 42, color: "bg-blue-500" },
  { label: "Total Projects", value: 15, color: "bg-green-500" },
  { label: "Pending Leaves", value: 3, color: "bg-yellow-500" },
];

const attendanceLast7Days = [
  { day: "Mon", percentage: 90 },
  { day: "Tue", percentage: 80 },
  { day: "Wed", percentage: 95 },
  { day: "Thu", percentage: 85 },
  { day: "Fri", percentage: 88 },
  { day: "Sat", percentage: 92 },
  { day: "Sun", percentage: 87 },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-700">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-white shadow rounded-lg flex flex-col items-center justify-center"
          >
            <p className="text-gray-500 font-medium">{stat.label}</p>
            <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
            <div className={`w-full h-1 mt-3 rounded ${stat.color}`}></div>
          </div>
        ))}
      </div>

      {/* Attendance Chart */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Attendance - Last 7 Days
        </h2>
        <div className="flex justify-between items-end h-48 gap-4">
          {attendanceLast7Days.map((day) => (
            <div key={day.day} className="flex flex-col items-center">
              <div
                className={`w-8 rounded-t bg-green-500 transition-all duration-500`}
                style={{ height: `${day.percentage}%` }}
              ></div>
              <span className="text-gray-600 mt-2 font-medium">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Progress Chart */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Project Completion Overview
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Project A</span>
            <span className="text-gray-800 font-bold">80%</span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded">
            <div className="bg-blue-500 h-3 rounded" style={{ width: "80%" }}></div>
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-gray-700 font-medium">Project B</span>
            <span className="text-gray-800 font-bold">55%</span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded">
            <div className="bg-yellow-500 h-3 rounded" style={{ width: "55%" }}></div>
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-gray-700 font-medium">Project C</span>
            <span className="text-gray-800 font-bold">30%</span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded">
            <div className="bg-red-500 h-3 rounded" style={{ width: "30%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
