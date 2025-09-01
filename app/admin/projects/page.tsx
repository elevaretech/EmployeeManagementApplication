"use client";

import { useEffect, useState } from "react";

type Employee = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  lead: Employee;
  teamMembers: Employee[];
  startDate: string;
  endDate: string;
  status: "Ongoing" | "Completed" | "Pending";
  progress: number; // 0-100
  priority: "Low" | "Medium" | "High";
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  useEffect(() => {
    // TODO: Replace with API calls
    setEmployees([
      { id: "1", name: "Sara Ahmed" },
      { id: "2", name: "Ali Khan" },
      { id: "3", name: "Zara Malik" },
    ]);

    setProjects([
      {
        id: "P-001",
        name: "Website Redesign",
        description: "Complete revamp of company website",
        lead: { id: "1", name: "Sara Ahmed" },
        teamMembers: [{ id: "2", name: "Ali Khan" }],
        startDate: "2025-08-01",
        endDate: "2025-08-31",
        status: "Ongoing",
        progress: 45,
        priority: "High",
      },
      {
        id: "P-002",
        name: "Mobile App Development",
        description: "iOS and Android app",
        lead: { id: "3", name: "Zara Malik" },
        teamMembers: [{ id: "2", name: "Ali Khan" }],
        startDate: "2025-07-15",
        endDate: "2025-09-15",
        status: "Pending",
        progress: 0,
        priority: "Medium",
      },
    ]);
  }, []);

  const handleEdit = (project: Project) => {
    setEditProject(project);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectData: Project = {
      id: editProject?.id || `P-${Date.now()}`,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      lead: employees.find((e) => e.id === formData.get("lead"))!,
      teamMembers: employees.filter((e) =>
        (formData.getAll("teamMembers") as string[]).includes(e.id)
      ),
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      status: formData.get("status") as Project["status"],
      progress: Number(formData.get("progress")),
      priority: formData.get("priority") as Project["priority"],
    };

    if (editProject) {
      setProjects(
        projects.map((p) => (p.id === editProject.id ? projectData : p))
      );
    } else {
      setProjects([...projects, projectData]);
    }

    setShowForm(false);
    setEditProject(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Manage Projects</h1>

      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 mb-4"
      >
        {editProject ? "Edit Project" : "Add New Project"}
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-start pt-10 z-50">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-6 rounded-2xl shadow-lg mb-6 w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-xl font-bold text-gray-700 mb-6">
              {editProject ? "Edit Project" : "Add New Project"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name*
                  </label>
                  <input
                    name="name"
                    defaultValue={editProject?.name || ""}
                    placeholder="Enter project name"
                    className="border p-2 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    name="description"
                    defaultValue={editProject?.description || ""}
                    placeholder="Project description"
                    className="border p-2 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                    required
                  />
                </div>
              </div>

              {/* Project Team */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Lead*
                  </label>
                  <select
                    name="lead"
                    defaultValue={editProject?.lead.id || ""}
                    className="border p-2 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Team Lead</option>
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Members*
                  </label>
                  <select
                    name="teamMembers"
                    multiple
                    required
                    defaultValue={
                      editProject?.teamMembers.map((e) => e.id) || []
                    }
                    className="border p-2 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                  >
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Hold Ctrl/Cmd to select multiple members
                  </p>
                </div>
              </div>

              {/* Project Timeline */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date*
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={editProject?.startDate || ""}
                    className="border p-2 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date*
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    defaultValue={editProject?.endDate || ""}
                    className="border p-2 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Project Status */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status*
                  </label>
                  <select
                    name="status"
                    defaultValue={editProject?.status || "Pending"}
                    className="border p-2 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Progress
                  </label>
                  <input
                    type="number"
                    name="progress"
                    min={0}
                    max={100}
                    defaultValue={editProject?.progress || 0}
                    className="border p-2 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        (editProject?.progress || 0) < 50
                          ? "bg-red-500"
                          : (editProject?.progress || 0) < 80
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${editProject?.progress || 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority*
                  </label>
                  <select
                    name="priority"
                    defaultValue={editProject?.priority || "Medium"}
                    className="border p-2 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditProject(null);
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {editProject ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-gray-700 min-w-[900px]">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border p-3 text-left">ID</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Lead</th>
              <th className="border p-3 text-left">Team Members</th>
              <th className="border p-3 text-left">Start Date</th>
              <th className="border p-3 text-left">End Date</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Progress</th>
              <th className="border p-3 text-left">Priority</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-blue-200 border">
                <td className="border p-3">{p.id}</td>
                <td className="border p-3">{p.name}</td>
                <td className="border p-3">{p.lead.name}</td>
                <td className="border p-3">
                  {p.teamMembers.map((m) => m.name).join(", ")}
                </td>
                <td className="border p-3">{p.startDate}</td>
                <td className="border p-3">{p.endDate}</td>
                <td className="border p-3">{p.status}</td>
                <td className="border p-3">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        p.progress < 50
                          ? "bg-red-500"
                          : p.progress < 80
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span className="text-sm">{p.progress}%</span>
                </td>
                <td className="border p-3">{p.priority}</td>
                <td className=" p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
