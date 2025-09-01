"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
type HR = {
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
  reportingManager?: string;
  employeesManaged?: number;
};

export default function HRProfile() {
  const params = useParams();
  const id = params.id as string;

  const [hr, setHR] = useState<HR | null>(null);

  useEffect(() => {
    // ✅ Replace with API call later
    const mockData: HR = {
      id: id || "1",
      companyId: "HR-101",
      name: "Ali Khan",
      role: "HR Manager",
      email: "ali.khan@example.com",
      phone: "+92-300-1234567",
      department: "Human Resources",
      joinDate: "2018-06-01",
      cnic: "35202-1234567-1",
      address: "123 Model Town, Lahore, Pakistan",
      dob: "1988-04-20",
      emergencyContact: "+92-301-7654321",
      profilePic: "/images/hr/ali.jpg",
      reportingManager: "CEO - Ahmed Raza",
      employeesManaged: 25,
    };

    setHR(mockData);
  }, [id]);

  if (!hr) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      {/* HR Info */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 flex gap-6 items-start">
        {hr.profilePic && (
          <Image
            src={hr.profilePic}
            alt={hr.name}
            className="w-28 h-28 rounded-xl object-cover border shadow-sm"
          />
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1 text-slate-600">{hr.name}</h1>
          <p className="text-gray-700">{hr.role}</p>
          <p className="text-sm text-gray-500 mb-4">{hr.department}</p>

          {/* Personal & Job Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
            <Detail label="Company ID" value={hr.companyId} />
            <Detail label="Email" value={hr.email} />
            <Detail label="Phone" value={hr.phone} />
            <Detail label="CNIC" value={hr.cnic} />
            <Detail label="Address" value={hr.address} />
            <Detail label="Date of Birth" value={hr.dob} />
            <Detail label="Emergency Contact" value={hr.emergencyContact} />
            <Detail label="Join Date" value={hr.joinDate} />
            <Detail label="Reporting Manager" value={hr.reportingManager} />
            <Detail
              label="Employees Managed"
              value={
                hr.employeesManaged ? `${hr.employeesManaged} Employees` : "-"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small reusable detail component */
function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <p>
      <span className="font-medium text-gray-700">{label}:</span>{" "}
      <span className="text-gray-600">{value || "-"}</span>
    </p>
  );
}
