"use client";
import { useState, useEffect } from "react";

interface Employee {
  id?: number;
  companyId: string;
  name: string;
  email: string;
  password: string;
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
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/users";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const closeEdit = () => {
    setEditingEmployee(null);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        // Ensure data is an array before setting it
        if (Array.isArray(data)) {
          setEmployees(data);
        } else if (data && typeof data === "object") {
          // If data is an object with nested employees array
          const employeesArray = data.users || data.data || [];
          setEmployees(employeesArray);
        } else {
          console.error("Received invalid data format:", data);
          setEmployees([]);
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        setEmployees([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSave = async (employee: Employee) => {
    try {
      const url = `${API_URL}${employee.id ? `/${employee.id}` : ""}`;
      const method = employee.id ? "PUT" : "POST";

      // Add default values for required fields
      const employeeData = {
        ...employee,
        status: employee.status || "active",
        joinDate: employee.joinDate || new Date().toISOString().split("T")[0],
      };

      console.log("Sending data:", employeeData);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Error response:", errorData);
        throw new Error(errorData?.message || "Failed to save employee");
      }

      const savedEmployee = await response.json();

      setEmployees((prev) =>
        employee.id
          ? prev.map((emp) =>
              emp.id === savedEmployee.id ? savedEmployee : emp
            )
          : [...prev, savedEmployee]
      );

      closeEdit();
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to save employee:", error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowAddForm(true)}
        >
          Add Employee
        </button>
      </div>

      {/* Employee List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : employees.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No employees found
          </div>
        ) : (
          employees.map((employee) => (
            <div
              key={employee.id}
              className="border p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div className="flex-grow">
                <div className="flex items-center gap-4">
                  <h3 className="font-semibold">{employee.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      employee.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.status}
                  </span>
                </div>
                <p className="text-gray-600">{employee.email}</p>
                <p className="text-sm text-gray-500">
                  {employee.role} - {employee.department}
                </p>
                <p className="text-sm text-gray-500">
                  Joined: {new Date(employee.joinDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setEditingEmployee(employee)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingEmployee) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const employee: Employee = {
                  companyId: formData.get("companyId") as string,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  password: formData.get("password") as string,
                  role: formData.get("role") as "hr" | "teamlead" | "internee",
                  phone: formData.get("phone") as string,
                  department: formData.get("department") as string,
                  joinDate: formData.get("joinDate") as string,
                  cnic: formData.get("cnic") as string,
                  address: formData.get("address") as string,
                  dob: formData.get("dob") as string,
                  emergencyContact: formData.get("emergencyContact") as string,
                  status: formData.get("status") as "active" | "inactive",
                };
                if (editingEmployee?.id) {
                  employee.id = editingEmployee.id;
                }
                handleSave(employee);
              }}
            >
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Company ID*
                  </label>
                  <input
                    name="companyId"
                    type="text"
                    required
                    defaultValue={editingEmployee?.companyId}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name*
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={editingEmployee?.name}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email*
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue={editingEmployee?.email}
                    className="w-full p-2 border rounded"
                  />
                </div>
                {!editingEmployee && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Password*
                    </label>
                    <input
                      name="password"
                      type="password"
                      required={!editingEmployee}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Role*
                  </label>
                  <select
                    name="role"
                    required
                    defaultValue={editingEmployee?.role}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Role</option>
                    <option value="hr">HR</option>
                    <option value="teamlead">Team Lead</option>
                    <option value="internee">Internee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    defaultValue={editingEmployee?.phone}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Department*
                  </label>
                  <input
                    name="department"
                    type="text"
                    required
                    defaultValue={editingEmployee?.department}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Join Date*
                  </label>
                  <input
                    name="joinDate"
                    type="date"
                    required
                    defaultValue={editingEmployee?.joinDate?.split("T")[0]}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    CNIC*
                  </label>
                  <input
                    name="cnic"
                    type="text"
                    required
                    defaultValue={editingEmployee?.cnic}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address*
                  </label>
                  <textarea
                    name="address"
                    required
                    defaultValue={editingEmployee?.address}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date of Birth*
                  </label>
                  <input
                    name="dob"
                    type="date"
                    required
                    defaultValue={editingEmployee?.dob?.split("T")[0]}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Emergency Contact*
                  </label>
                  <input
                    name="emergencyContact"
                    type="tel"
                    required
                    defaultValue={editingEmployee?.emergencyContact}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status*
                  </label>
                  <select
                    name="status"
                    required
                    defaultValue={editingEmployee?.status || "active"}
                    className="w-full p-2 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded"
                  onClick={() => {
                    setShowAddForm(false);
                    closeEdit();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
