"use client";

import { useState, useEffect } from "react";
import { Bell, Sun, Moon, Settings } from "lucide-react";

interface TopbarProps {
  name: string;
  role: string;
}

export default function Topbar({ name, role }: TopbarProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="w-full flex items-center justify-between px-6 py-3 border-b bg-white dark:bg-gray-900 dark:text-white">
      {/* Left Side (Role + Name) */}
      <div className="flex items-center gap-2">
        <span className="font-semibold">{name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({role})
        </span>
      </div>

      {/* Right Side (Icons) */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        {/* Settings */}
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
