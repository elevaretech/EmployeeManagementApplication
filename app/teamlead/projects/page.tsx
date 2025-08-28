"use client";

import { useState } from "react";

// Project type
type ProjectStatus = "Planning" | "In Progress" | "On Hold" | "Completed";

type Project = {
  id: string;
  name: string;
  description: string;
  deadline: string;
  status: ProjectStatus;
};

const initialProjects: Project[] = [
  {
    id: "1",
    name: "AI Chatbot",
    description: "Build a customer support AI chatbot.",
    deadline: "2025-09-15",
    status: "Planning",
  },
  {
    id: "2",
    name: "E-Commerce Dashboard",
    description: "Create a dashboard for sales and analytics.",
    deadline: "2025-10-05",
    status: "In Progress",
  },
  {
    id: "3",
    name: "Portfolio Website",
    description: "Design personal portfolio for client.",
    deadline: "2025-09-30",
    status: "On Hold",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  // Toggle project status in a cycle
  const toggleStatus = (id: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? {
              ...project,
              status:
                project.status === "Planning"
                  ? "In Progress"
                  : project.status === "In Progress"
                  ? "On Hold"
                  : project.status === "On Hold"
                  ? "Completed"
                  : "Planning",
            }
          : project
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">
        Team Projects
      </h1>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg shadow-sm p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {project.name}
              </h2>
              <button
                onClick={() => toggleStatus(project.id)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  project.status === "Planning"
                    ? "bg-gray-200 text-gray-800"
                    : project.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : project.status === "On Hold"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {project.status}
              </button>
            </div>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Deadline: <span className="font-medium">{project.deadline}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
