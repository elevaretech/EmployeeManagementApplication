"use client";
import { useState } from "react";

type Employee = {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    team: string;
    projects: number;
    performance: string;
    attendance: number; // percentage
};

const employeesData: Employee[] = [
    {
        id: 1,
        name: "Talha Qureshi",
        role: "Employee",
        email: "talha@example.com",
        phone: "0324-1274346",
        team: "Web Development",
        projects: 3,
        performance: "Excellent",
        attendance: 95,
    },
    {
        id: 2,
        name: "Ahmad Faizan",
        role: "Team Lead",
        email: "faizan@example.com",
        phone: "0309-1079806",
        team: "Data Science",
        projects: 5,
        performance: "Very Good",
        attendance: 90,
    },
    // Add more sample data
];

export default function ViewEmployees() {
    const [employees, setEmployees] = useState<Employee[]>(employeesData);
    const [search, setSearch] = useState("");

    const filteredEmployees = employees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">View Employees</h1>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-3 border border-gray-300 rounded w-full md:w-1/3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Employee Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-gray-700 text-sm md:text-base">EID</th>

                            <th className="py-3 px-4 text-left text-gray-700 text-sm md:text-base">Name</th>
                            <th className="py-3 px-4 text-left text-gray-700 text-sm md:text-base">Role</th>
                            <th className="py-3 px-4 text-left text-gray-700 text-sm md:text-base">Email</th>
                            <th className="py-3 px-4 text-left text-gray-700 text-sm md:text-base">Phone</th>
                            <th className="py-3 px-4 text-left text-gray-700 text-sm md:text-base">Team</th>
                            <th className="py-3 px-4 text-left text-gray-700 text-sm md:text-base">Projects</th>
                            <th className="py-3 px-4 text-left text-gray-700 text-sm md:text-base">Performance</th>
                            <th className="py-3 px-4 text-left text-gray-700 text-sm md:text-base">Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-gray-800 text-sm md:text-base">{emp.id}</td>
                                <td className="py-2 px-4 text-gray-800 text-sm md:text-base">{emp.name}</td>
                                <td className="py-2 px-4 text-gray-800 text-sm md:text-base">{emp.role}</td>
                                <td className="py-2 px-4 text-gray-800 text-sm md:text-base">{emp.email}</td>
                                <td className="py-2 px-4 text-gray-800 text-sm md:text-base">{emp.phone}</td>
                                <td className="py-2 px-4 text-gray-800 text-sm md:text-base">{emp.team}</td>
                                <td className="py-2 px-4 text-gray-800 text-sm md:text-base">{emp.projects}</td>
                                <td className="py-2 px-4 text-gray-800 text-sm md:text-base">{emp.performance}</td>
                                <td className="py-2 px-4 text-gray-800 text-sm md:text-base">{emp.attendance}%</td>
                            </tr>
                        ))}
                        {filteredEmployees.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-gray-500 text-sm md:text-base">
                                    No employees found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
