"use client"; // Required for hooks

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

/** Types */
type TaskStatus = "Upcoming" | "In Progress" | "Completed" | "Pending";

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  due?: string;
  progress?: number; // 0-100
};

type Project = {
  id: string;
  name: string;
  description?: string;
  leadName: string;
};

type Employee = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  department?: string;
  joinDate?: string;
  projects: Project[];
  tasks: Task[];
};

export default function EmployeeDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; // Next.js returns string | string[] | undefined

  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    // ✅ Replace with API call
    const mockData: Employee = {
      id: id || "1",
      name: "Ali Khan",
      role: "Software Engineer",
      email: "ali.khan@example.com",
      phone: "+92-300-1234567",
      department: "Development",
      joinDate: "2022-05-12",
      projects: [
        {
          id: "p1",
          name: "E-commerce Platform",
          description: "Developing a scalable online shopping system",
          leadName: "Sara Ahmed",
        },
        {
          id: "p2",
          name: "Employee Portal",
          description: "Internal portal for employees and HR",
          leadName: "Ahmed Raza",
        },
      ],
      tasks: [
        {
          id: "t1",
          title: "Implement login",
          status: "Completed",
          progress: 100,
        },
        {
          id: "t2",
          title: "Design dashboard",
          status: "In Progress",
          progress: 60,
        },
        { id: "t3", title: "Setup CI/CD", status: "Upcoming", progress: 0 },
      ],
    };

    setEmployee(mockData);
  }, [id]);

  if (!employee) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()} // ✅ instead of navigate(-1)
        className="mb-4 px-4 py-2 bg-gray-200 rounded-lg shadow hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* Employee Info */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">{employee.name}</h1>
        <p className="text-gray-600">{employee.role}</p>
        <p className="text-sm text-gray-500">{employee.department}</p>
        <div className="mt-4 space-y-1 text-sm text-gray-700">
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Phone:</strong> {employee.phone}
          </p>
          <p>
            <strong>Join Date:</strong> {employee.joinDate}
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        {employee.projects.length === 0 ? (
          <p className="text-gray-500">No projects assigned.</p>
        ) : (
          <ul className="space-y-3">
            {employee.projects.map((proj) => (
              <li key={proj.id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold">{proj.name}</h3>
                <p className="text-sm text-gray-600">{proj.description}</p>
                <p className="text-xs text-gray-500">
                  Lead: <span className="font-medium">{proj.leadName}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        {employee.tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned.</p>
        ) : (
          <ul className="space-y-3">
            {employee.tasks.map((task) => (
              <li
                key={task.id}
                className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.status}</p>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      task.status === "Completed"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${task.progress || 0}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
