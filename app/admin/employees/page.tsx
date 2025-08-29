"use client";

import { useEffect, useState } from "react";

type Employee = {
  id: string;
  employeeId: string;
  name: string;
  role: "Employee" | "Team Lead" | "HR" | "Admin";
  email: string;
  phone?: string;
  cnic?: string;
  address?: string;
  dob?: string;
  department?: string;
  joinDate?: string;
  contractEndDate?: string;
  specialization?: string;
  emergencyContact?: string;
  profilePic?: string;
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    // ✅ Replace with API call later
    const mockData: Employee[] = [
      {
        id: "1",
        employeeId: "EMP-101",
        name: "Ali Khan",
        role: "Employee",
        email: "ali.khan@example.com",
        phone: "+92-300-1234567",
        cnic: "35202-1234567-1",
        address: "Street 12, Lahore",
        dob: "1992-05-15",
        department: "Development",
        joinDate: "2022-01-10",
        contractEndDate: "2025-01-09",
        specialization: "Frontend",
        emergencyContact: "+92-301-7654321",
        profilePic: "/images/employees/ali.jpg",
      },
      {
        id: "2",
        employeeId: "EMP-102",
        name: "Sara Ahmed",
        role: "Team Lead",
        email: "sara.ahmed@example.com",
        phone: "+92-300-9876543",
        cnic: "35202-9876543-1",
        address: "Gulberg III, Lahore",
        dob: "1990-11-10",
        department: "Development",
        joinDate: "2020-03-15",
        contractEndDate: "2024-03-14",
        specialization: "Full-Stack",
        emergencyContact: "+92-301-4567890",
        profilePic: "/images/employees/sara.jpg",
      },
    ];
    setEmployees(mockData);
  }, []);

  const openEdit = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const closeEdit = () => {
    setEditingEmployee(null);
  };

  const handleSave = (updated: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updated.id ? updated : emp))
    );
    closeEdit();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Manage Employees</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Employee ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Join Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={emp.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 text-gray-800">{emp.employeeId}</td>
                <td className="px-4 py-2 text-gray-800">{emp.name}</td>
                <td className="px-4 py-2 text-gray-800">{emp.role}</td>
                <td className="px-4 py-2 text-gray-800">{emp.email}</td>
                <td className="px-4 py-2 text-gray-800">{emp.phone}</td>
                <td className="px-4 py-2 text-gray-800">{emp.department}</td>
                <td className="px-4 py-2 text-gray-800">{emp.joinDate}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => openEdit(emp)}
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={closeEdit}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

/* Modal Form for Editing Employee */
function EditEmployeeModal({
  employee,
  onClose,
  onSave,
}: {
  employee: Employee;
  onClose: () => void;
  onSave: (updated: Employee) => void;
}) {
  const [formData, setFormData] = useState<Employee>({ ...employee });

  const handleChange = (field: keyof Employee, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Edit Employee</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <InputField
            label="Employee ID"
            value={formData.employeeId}
            onChange={(val) => handleChange("employeeId", val)}
          />
          <InputField
            label="Name"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
          />
          <InputField
            label="Role"
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            type="select"
            options={["Employee", "Team Lead", "HR", "Admin"]}
          />
          <InputField
            label="Email"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
          />
          <InputField
            label="Phone"
            value={formData.phone || ""}
            onChange={(val) => handleChange("phone", val)}
          />
          <InputField
            label="CNIC"
            value={formData.cnic || ""}
            onChange={(val) => handleChange("cnic", val)}
          />
          <InputField
            label="Address"
            value={formData.address || ""}
            onChange={(val) => handleChange("address", val)}
          />
          <InputField
            label="DOB"
            value={formData.dob || ""}
            onChange={(val) => handleChange("dob", val)}
            type="date"
          />
          <InputField
            label="Department"
            value={formData.department || ""}
            onChange={(val) => handleChange("department", val)}
          />
          <InputField
            label="Join Date"
            value={formData.joinDate || ""}
            onChange={(val) => handleChange("joinDate", val)}
            type="date"
          />
          <InputField
            label="Contract End Date"
            value={formData.contractEndDate || ""}
            onChange={(val) => handleChange("contractEndDate", val)}
            type="date"
          />
          <InputField
            label="Specialization"
            value={formData.specialization || ""}
            onChange={(val) => handleChange("specialization", val)}
          />
          <InputField
            label="Emergency Contact"
            value={formData.emergencyContact || ""}
            onChange={(val) => handleChange("emergencyContact", val)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => onSave(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* Small reusable input component */
function InputField({
  label,
  value,
  onChange,
  type = "text",
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: "text" | "date" | "select";
  options?: string[];
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-600 text-sm mb-1">{label}</label>
      {type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      )}
    </div>
  );
}
