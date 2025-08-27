"use client";

import { useEffect, useState } from "react";

/** Types */
type AttendanceEntry = {
  id: string;
  date: string; // yyyy-mm-dd
  shift: string;
  start: string; // HH:MM
  end: string; // HH:MM
  hours: number;
  tasksDone: number;
  note?: string;
};

/** LocalStorage Key */
const ATT_KEY = "elevare_internee_attendance";

/** Utility: calculate hours between HH:MM (handles overnight) */
function calcHours(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startMinutes = sh * 60 + sm;
  let endMinutes = eh * 60 + em;

  if (endMinutes < startMinutes) endMinutes += 24 * 60; // overnight
  const diff = endMinutes - startMinutes;
  return Math.round((diff / 60) * 100) / 100; // 2 decimals
}

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceEntry[]>([]);

  // Form fields (also used for editing)
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [shift, setShift] = useState("Morning");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");
  const [tasksDone, setTasksDone] = useState<number>(0);
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter
  const [filterFrom, setFilterFrom] = useState<string>("");
  const [filterTo, setFilterTo] = useState<string>("");

  /** Load from localStorage */
  useEffect(() => {
    const raw = localStorage.getItem(ATT_KEY);
    if (raw) {
      setAttendance(JSON.parse(raw));
    } else {
      // optional demo entry
      const demo: AttendanceEntry[] = [
        {
          id: String(Date.now() - 86400),
          date: new Date(Date.now() - 86400 * 1000).toISOString().slice(0, 10),
          shift: "Morning",
          start: "09:00",
          end: "17:00",
          hours: 8,
          tasksDone: 3,
          note: "Demo entry",
        },
      ];
      setAttendance(demo);
      localStorage.setItem(ATT_KEY, JSON.stringify(demo));
    }
  }, []);

  /** Save helper */
  const saveAttendance = (a: AttendanceEntry[]) => {
    setAttendance(a);
    localStorage.setItem(ATT_KEY, JSON.stringify(a));
  };

  /** Add or Update attendance */
  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // basic validation
    if (!date || !start || !end) return;

    const hours = calcHours(start, end);

    if (editingId) {
      // update
      const next = attendance.map((entry) =>
        entry.id === editingId
          ? { ...entry, date, shift, start, end, hours, tasksDone, note }
          : entry
      );
      saveAttendance(next);
      setEditingId(null);
    } else {
      // create
      const entry: AttendanceEntry = {
        id: String(Date.now()),
        date,
        shift,
        start,
        end,
        hours,
        tasksDone,
        note,
      };
      saveAttendance([entry, ...attendance]);
    }

    // reset form
    setTasksDone(0);
    setNote("");
    setStart("09:00");
    setEnd("17:00");
    setShift("Morning");
    setDate(new Date().toISOString().slice(0, 10));
  }

  /** Edit entry */
  function handleEdit(id: string) {
    const e = attendance.find((a) => a.id === id);
    if (!e) return;
    setEditingId(id);
    setDate(e.date);
    setShift(e.shift);
    setStart(e.start);
    setEnd(e.end);
    setTasksDone(e.tasksDone);
    setNote(e.note || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /** Delete entry */
  function handleDelete(id: string) {
    if (!confirm("Delete this attendance record?")) return;
    const next = attendance.filter((a) => a.id !== id);
    saveAttendance(next);
  }

  /** Filtered list */
  const filtered = attendance.filter((a) => {
    if (filterFrom && a.date < filterFrom) return false;
    if (filterTo && a.date > filterTo) return false;
    return true;
  });

  /** Aggregates for filter / display */
  const totalHours = filtered.reduce((s, a) => s + a.hours, 0);
  const totalTasks = filtered.reduce((s, a) => s + a.tasksDone, 0);

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">
            {editingId ? "Edit Attendance" : "Mark Daily Attendance"}
          </h1>
          {editingId && (
            <button
              onClick={() => {
                // cancel edit
                setEditingId(null);
                setTasksDone(0);
                setNote("");
                setStart("09:00");
                setEnd("17:00");
                setShift("Morning");
                setDate(new Date().toISOString().slice(0, 10));
              }}
              className="text-sm text-slate-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Save your working hours and notes. Hours auto-calculated.
        </p>

        <form onSubmit={handleSave} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Shift</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              >
                <option>Morning</option>
                <option>Evening</option>
                <option>Night</option>
                <option>Remote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">Start</label>
              <input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">End</label>
              <input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">
                Tasks completed today
              </label>
              <input
                type="number"
                min={0}
                value={tasksDone}
                onChange={(e) => setTasksDone(Number(e.target.value))}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">Note</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
                placeholder="e.g., blocked by API"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Calculated hours:{" "}
              <span className="font-medium text-slate-700">
                {calcHours(start, end)} hrs
              </span>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#002B5C] text-white rounded-lg"
            >
              {editingId ? "Update Entry" : "Save Attendance"}
            </button>
          </div>
        </form>
      </div>

      {/* Filters & Summary */}
      <div className="bg-white rounded-2xl shadow border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div>
            <div className="text-xs text-slate-500">From</div>
            <input
              type="date"
              value={filterFrom}
              onChange={(e) => setFilterFrom(e.target.value)}
              className="mt-1 border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <div className="text-xs text-slate-500">To</div>
            <input
              type="date"
              value={filterTo}
              onChange={(e) => setFilterTo(e.target.value)}
              className="mt-1 border rounded-lg px-3 py-2"
            />
          </div>
          <button
            onClick={() => {
              setFilterFrom("");
              setFilterTo("");
            }}
            className="mt-5 md:mt-1 text-sm text-slate-600 hover:underline"
          >
            Clear
          </button>
        </div>

        <div className="text-sm text-slate-500">
          <div>
            Total entries:{" "}
            <span className="font-medium text-slate-700">
              {filtered.length}
            </span>
          </div>
          <div className="mt-1">
            Total hours:{" "}
            <span className="font-medium text-slate-700">{totalHours} hrs</span>
          </div>
          <div className="mt-1">
            Total tasks:{" "}
            <span className="font-medium text-slate-700">{totalTasks}</span>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          Recent Attendance
        </h2>

        {attendance.length === 0 ? (
          <div className="text-sm text-slate-500">
            No attendance records yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Shift</th>
                  <th className="pb-2">Start</th>
                  <th className="pb-2">End</th>
                  <th className="pb-2">Hours</th>
                  <th className="pb-2">Tasks</th>
                  <th className="pb-2">Note</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="py-2">{a.date}</td>
                    <td className="py-2">{a.shift}</td>
                    <td className="py-2">{a.start}</td>
                    <td className="py-2">{a.end}</td>
                    <td className="py-2">{a.hours}</td>
                    <td className="py-2">{a.tasksDone}</td>
                    <td className="py-2">{a.note || "—"}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(a.id)}
                          className="text-sm text-slate-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
