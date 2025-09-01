"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  description?: string;
  leadName: string;
};

type Employee = {
  id: string;
  companyId: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  department?: string;
  joinDate?: string;
  cnic?: string;
  address?: string;
  dob?: string;
  emergencyContact?: string;
  profilePic?: string;
  projects: Project[];
};

export default function EmployeeDetail() {
  const params = useParams();
  const id = params.id as string;

  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    // ✅ Replace with API call
    const mockData: Employee = {
      id: id || "1",
      companyId: "EMP-1023",
      name: "Ali Khan",
      role: "Software Engineer",
      email: "ali.khan@example.com",
      phone: "+92-300-1234567",
      department: "Development",
      joinDate: "2022-05-12",
      cnic: "35202-1234567-9",
      address: "123 DHA Phase 4, Lahore, Pakistan",
      dob: "1998-07-21",
      emergencyContact: "+92-301-9876543",
      profilePic: "/images/employees/ali.jpg",
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
    };

    setEmployee(mockData);
  }, [id]);

  if (!employee) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      {/* Employee Info */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 flex gap-6 items-start">
        {employee.profilePic && (
          <Image
            src={employee.profilePic}
            alt={employee.name}
            className="w-28 h-28 rounded-xl object-cover border shadow-sm"
          />
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1 text-slate-500">
            {employee.name}
          </h1>
          <p className="text-gray-600">{employee.role}</p>
          <p className="text-sm text-gray-500 mb-4">{employee.department}</p>

          {/* Personal Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
            <Detail label="Company ID" value={employee.companyId} />
            <Detail label="Email" value={employee.email} />
            <Detail label="Phone" value={employee.phone} />
            <Detail label="CNIC" value={employee.cnic} />
            <Detail label="Address" value={employee.address} />
            <Detail label="Date of Birth" value={employee.dob} />
            <Detail
              label="Emergency Contact"
              value={employee.emergencyContact}
            />
            <Detail label="Join Date" value={employee.joinDate} />
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-slate-500">Projects</h2>
        {employee.projects.length === 0 ? (
          <p className="text-gray-500">No projects assigned.</p>
        ) : (
          <ul className="space-y-3">
            {employee.projects.map((proj) => (
              <li
                key={proj.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-slate-500">{proj.name}</h3>
                <p className="text-sm text-gray-600">{proj.description}</p>
                <p className="text-xs text-gray-500">
                  Lead: <span className="font-medium">{proj.leadName}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* Small component to keep detail layout clean */
function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <p>
      <span className="font-medium text-gray-700">{label}:</span>{" "}
      <span className="text-gray-600">{value || "-"}</span>
    </p>
  );
}
