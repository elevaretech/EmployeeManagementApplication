"use client";

import { useEffect, useState } from "react";

type Employee = {
  id?: string;
  companyId: string;
  name: string;
  email: string;
  password?: string;
  role: "hr" | "teamlead" | "internee";
  phone?: string;
  department: string;
  joinDate: string;
  cnic: string;
  address: string;
  dob: string;
  emergencyContact: string;
  profilePic?: string;
  status: "active" | "inactive";
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // ✅ Replace with API call later
    const mockData: Employee[] = [
      {
        id: "1",
        companyId: "ELV-101",
        name: "Ali Khan",
        role: "internee",
        email: "ali.khan@example.com",
        phone: "+92-300-1234567",
        cnic: "35202-1234567-1",
        address: "Street 12, Lahore",
        dob: "1992-05-15",
        department: "Development",
        joinDate: "2022-01-10",
        emergencyContact: "+92-301-7654321",
        profilePic: "/images/employees/ali.jpg",
        status: "active",
      },
      {
        id: "2",
        companyId: "ELV-102",
        name: "Sara Ahmed",
        role: "teamlead",
        email: "sara.ahmed@example.com",
        phone: "+92-300-9876543",
        cnic: "35202-9876543-1",
        address: "Gulberg III, Lahore",
        dob: "1990-11-10",
        department: "Development",
        joinDate: "2020-03-15",
        emergencyContact: "+92-301-4567890",
        profilePic: "/images/employees/sara.jpg",
        status: "active",
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Manage Employees</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Company ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr
                key={emp.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 text-gray-800">{emp.companyId}</td>
                <td className="px-4 py-2 text-gray-800">{emp.name}</td>
                <td className="px-4 py-2 text-gray-800">{emp.role}</td>
                <td className="px-4 py-2 text-gray-800">{emp.email}</td>
                <td className="px-4 py-2 text-gray-800">{emp.department}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      emp.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
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

      {/* Add/Edit Modal */}
      {(showAddForm || editingEmployee) && (
        <EmployeeFormModal
          employee={editingEmployee}
          onClose={() => {
            setShowAddForm(false);
            setEditingEmployee(null);
          }}
          onSave={(employee) => {
            if (editingEmployee) {
              handleSave(employee);
            } else {
              setEmployees((prev) => [
                ...prev,
                { ...employee, id: Date.now().toString() },
              ]);
              setShowAddForm(false);
            }
          }}
        />
      )}
    </div>
  );
}

/* Modal Form for Adding/Editing Employee */
function EmployeeFormModal({
  employee,
  onClose,
  onSave,
}: {
  employee: Employee | null;
  onClose: () => void;
  onSave: (employee: Employee) => void;
}) {
  const [formData, setFormData] = useState<Employee>(
    employee || {
      companyId: "",
      name: "",
      email: "",
      password: "",
      role: "internee",
      phone: "",
      department: "",
      joinDate: new Date().toISOString().split("T")[0],
      cnic: "",
      address: "",
      dob: "",
      emergencyContact: "",
      status: "active",
    }
  );

  const handleChange = (field: keyof Employee, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          {employee ? "Edit Employee" : "Add New Employee"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <InputField
            label="Company ID"
            value={formData.companyId}
            onChange={(val) => handleChange("companyId", val)}
          />
          <InputField
            label="Name"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
          />
          <InputField
            label="Email"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
            type="email"
          />
          {!employee && (
            <InputField
              label="Password"
              value={formData.password || ""}
              onChange={(val) => handleChange("password", val)}
              type="password"
            />
          )}
          <InputField
            label="Role"
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            type="select"
            options={["hr", "teamlead", "internee"]}
          />
          <InputField
            label="Department"
            value={formData.department}
            onChange={(val) => handleChange("department", val)}
          />
          <InputField
            label="Join Date"
            value={formData.joinDate}
            onChange={(val) => handleChange("joinDate", val)}
            type="date"
          />
          <InputField
            label="CNIC"
            value={formData.cnic}
            onChange={(val) => handleChange("cnic", val)}
          />
          <InputField
            label="Phone"
            value={formData.phone || ""}
            onChange={(val) => handleChange("phone", val)}
          />
          <InputField
            label="Address"
            value={formData.address}
            onChange={(val) => handleChange("address", val)}
          />
          <InputField
            label="Date of Birth"
            value={formData.dob}
            onChange={(val) => handleChange("dob", val)}
            type="date"
          />
          <InputField
            label="Emergency Contact"
            value={formData.emergencyContact}
            onChange={(val) => handleChange("emergencyContact", val)}
          />
          <InputField
            label="Status"
            value={formData.status}
            onChange={(val) => handleChange("status", val)}
            type="select"
            options={["active", "inactive"]}
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
  type?: "text" | "date" | "select" | "email" | "password";
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
