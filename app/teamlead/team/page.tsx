// "use client";
// import { useState } from "react";

// type TaskStatus = "Upcoming" | "In Progress" | "Completed" | "Pending";

// type Task = {
//   id: string;
//   title: string;
//   due: string;
//   status: TaskStatus;
// };

// type Intern = {
//   id: string;
//   name: string;
//   role: string;
//   tasks: Task[];
// };

// export default function ManageTeam() {
//   const [interns, setInterns] = useState<Intern[]>([
//     {
//       id: "INT001",
//       name: "Ali Khan",
//       role: "Frontend Intern",
//       tasks: [
//         { id: "T1", title: "Build Login Page", due: "2025-08-30", status: "In Progress" },
//         { id: "T2", title: "Fix Navbar Bug", due: "2025-09-02", status: "Upcoming" },
//       ],
//     },
//     {
//       id: "INT002",
//       name: "Sara Ahmed",
//       role: "Backend Intern",
//       tasks: [{ id: "T3", title: "API for Tasks", due: "2025-08-31", status: "Pending" }],
//     },
//   ]);

//   const [newTask, setNewTask] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [selectedIntern, setSelectedIntern] = useState<string | null>(null);

//   const handleAssignTask = (internId: string) => {
//     if (!newTask || !dueDate) return;
//     setInterns((prev) =>
//       prev.map((i) =>
//         i.id === internId
//           ? {
//               ...i,
//               tasks: [
//                 ...i.tasks,
//                 {
//                   id: Date.now().toString(),
//                   title: newTask,
//                   due: dueDate,
//                   status: "Upcoming",
//                 },
//               ],
//             }
//           : i
//       )
//     );
//     setNewTask("");
//     setDueDate("");
//     setSelectedIntern(null);
//   };

//   const handleDeleteTask = (internId: string, taskId: string) => {
//     setInterns((prev) =>
//       prev.map((i) =>
//         i.id === internId ? { ...i, tasks: i.tasks.filter((t) => t.id !== taskId) } : i
//       )
//     );
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-slate-500">Manage Team</h1>

//       <div className="grid md:grid-cols-2 gap-6">
//         {interns.map((intern) => (
//           <div key={intern.id} className="border rounded-xl shadow p-4 bg-white">
//             <div className="flex justify-between items-center mb-3">
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-500">{intern.name}</h2>
//                 <p className="text-sm text-gray-500">
//                   {intern.role} • ID: {intern.id}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSelectedIntern(intern.id)}
//                 className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//               >
//                 + Assign Task
//               </button>
//             </div>

//             {/* Assign Task Form */}
//             {selectedIntern === intern.id && (
//               <div className="mb-3 flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Task "
//                   className="border p-2 rounded w-1/2 text-slate-300"
//                   value={newTask}
//                   onChange={(e) => setNewTask(e.target.value)}
//                 />
//                 <input
//                   type="date"
//                   className="border p-2 rounded text-slate-300"
//                   value={dueDate}
//                   onChange={(e) => setDueDate(e.target.value)}
//                 />
//                 <button
//                   onClick={() => handleAssignTask(intern.id)}
//                   className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   Save
//                 </button>
//               </div>
//             )}

//             {/* Task List */}
//             <ul className="space-y-2">
//               {intern.tasks.map((task) => (
//                 <li
//                   key={task.id}
//                   className="flex justify-between items-center border p-2 rounded-lg"
//                 >
//                   <div>
//                     <p className="font-medium text-slate-500">{task.title}</p>
//                     <p className="text-sm text-gray-500">
//                       Due: {task.due} | Status:{" "}
//                       <span
//                         className={
//                           task.status === "Completed"
//                             ? "text-green-600"
//                             : task.status === "In Progress"
//                             ? "text-blue-600"
//                             : task.status === "Upcoming"
//                             ? "text-yellow-600"
//                             : "text-gray-600"
//                         }
//                       >
//                         {task.status}
//                       </span>
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleDeleteTask(intern.id, task.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     ✕
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";

type TaskStatus = "Upcoming" | "In Progress" | "Completed" | "Pending";

type Task = {
  id: string;
  title: string;
  due: string;
  status: TaskStatus;
};

type Intern = {
  id: string;
  name: string;
  role: string;
  tasks: Task[];
};

export default function ManageTeam() {
  const [interns, setInterns] = useState<Intern[]>([
    {
      id: "INT001",
      name: "Ali Khan",
      role: "Frontend Intern",
      tasks: [
        { id: "T1", title: "Build Login Page", due: "2025-08-30", status: "In Progress" },
        { id: "T2", title: "Fix Navbar Bug", due: "2025-09-02", status: "Upcoming" },
      ],
    },
    {
      id: "INT002",
      name: "Sara Ahmed",
      role: "Backend Intern",
      tasks: [{ id: "T3", title: "API for Tasks", due: "2025-08-31", status: "Pending" }],
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedIntern, setSelectedIntern] = useState<string | null>(null);

  // NEW STATES FOR EDITING
  const [editingTask, setEditingTask] = useState<{ internId: string; taskId: string } | null>(null);
  const [editValues, setEditValues] = useState<{ title: string; due: string }>({ title: "", due: "" });

  const handleAssignTask = (internId: string) => {
    if (!newTask || !dueDate) return;
    setInterns((prev) =>
      prev.map((i) =>
        i.id === internId
          ? {
              ...i,
              tasks: [
                ...i.tasks,
                {
                  id: Date.now().toString(),
                  title: newTask,
                  due: dueDate,
                  status: "Upcoming",
                },
              ],
            }
          : i
      )
    );
    setNewTask("");
    setDueDate("");
    setSelectedIntern(null);
  };

  const handleDeleteTask = (internId: string, taskId: string) => {
    setInterns((prev) =>
      prev.map((i) =>
        i.id === internId ? { ...i, tasks: i.tasks.filter((t) => t.id !== taskId) } : i
      )
    );
  };

  // START EDIT
  const handleStartEdit = (internId: string, task: Task) => {
    setEditingTask({ internId, taskId: task.id });
    setEditValues({ title: task.title, due: task.due });
  };

  // UPDATE TASK
  const handleUpdateTask = () => {
    if (!editingTask) return;
    setInterns((prev) =>
      prev.map((i) =>
        i.id === editingTask.internId
          ? {
              ...i,
              tasks: i.tasks.map((t) =>
                t.id === editingTask.taskId ? { ...t, title: editValues.title, due: editValues.due } : t
              ),
            }
          : i
      )
    );
    setEditingTask(null);
    setEditValues({ title: "", due: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-500">Manage Team</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {interns.map((intern) => (
          <div key={intern.id} className="border rounded-xl shadow p-4 bg-white">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-500">{intern.name}</h2>
                <p className="text-sm text-gray-500">
                  {intern.role} • ID: {intern.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedIntern(intern.id)}
                className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                + Assign Task
              </button>
            </div>

            {/* Assign Task Form */}
            {selectedIntern === intern.id && (
              <div className="mb-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Task "
                  className="border p-2 rounded w-1/2 text-slate-300"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <input
                  type="date"
                  className="border p-2 rounded text-slate-300"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <button
                  onClick={() => handleAssignTask(intern.id)}
                  className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            )}

            {/* Task List */}
            <ul className="space-y-2">
              {intern.tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center border p-2 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-500">{task.title}</p>
                    <p className="text-sm text-gray-500">
                      Due: {task.due} | Status:{" "}
                      <span
                        className={
                          task.status === "Completed"
                            ? "text-green-600"
                            : task.status === "In Progress"
                            ? "text-blue-600"
                            : task.status === "Upcoming"
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }
                      >
                        {task.status}
                      </span>
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleStartEdit(intern.id, task)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDeleteTask(intern.id, task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-slate-500">Edit Task</h2>
            <input
              type="text"
              className="border p-2 rounded w-full mb-3 text-slate-500"
              placeholder="Task Title"
              value={editValues.title}
              onChange={(e) => setEditValues((prev) => ({ ...prev, title: e.target.value }))}
            />
            <input
              type="date"
              className="border p-2 rounded w-full mb-3 text-slate-500"
              value={editValues.due}
              onChange={(e) => setEditValues((prev) => ({ ...prev, due: e.target.value }))}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
