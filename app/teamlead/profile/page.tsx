"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type TeamLead = {
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
  specialization?: string;
  teamSize?: number;
  reportingManager?: string;
};

export default function TeamLeadProfile() {
  const params = useParams();
  const id = params.id as string;

  const [teamLead, setTeamLead] = useState<TeamLead | null>(null);

  useEffect(() => {
    // ✅ Replace with API call later
    const mockData: TeamLead = {
      id: id || "1",
      companyId: "TL-204",
      name: "Sara Ahmed",
      role: "Team Lead - Development",
      email: "sara.ahmed@example.com",
      phone: "+92-300-9876543",
      department: "Development",
      joinDate: "2020-03-15",
      cnic: "35202-9876543-1",
      address: "456 Gulberg III, Lahore, Pakistan",
      dob: "1990-11-10",
      emergencyContact: "+92-301-4567890",
      profilePic: "/images/teamleads/sara.jpg",
      specialization: "Full-Stack Development",
      teamSize: 8,
      reportingManager: "CTO - Ahmed Raza",
    };

    setTeamLead(mockData);
  }, [id]);

  if (!teamLead) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      {/* Team Lead Info */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 flex gap-6 items-start">
        {teamLead.profilePic && (
          <Image
            src={teamLead.profilePic}
            alt={teamLead.name}
            className="w-28 h-28 rounded-xl object-cover border shadow-sm"
          />
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1 text-slate-600">
            {teamLead.name}
          </h1>
          <p className="text-gray-700">{teamLead.role}</p>
          <p className="text-sm text-gray-500 mb-4">{teamLead.department}</p>

          {/* Personal & Job Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
            <Detail label="Company ID" value={teamLead.companyId} />
            <Detail label="Email" value={teamLead.email} />
            <Detail label="Phone" value={teamLead.phone} />
            <Detail label="CNIC" value={teamLead.cnic} />
            <Detail label="Address" value={teamLead.address} />
            <Detail label="Date of Birth" value={teamLead.dob} />
            <Detail
              label="Emergency Contact"
              value={teamLead.emergencyContact}
            />
            <Detail label="Join Date" value={teamLead.joinDate} />
            <Detail label="Specialization" value={teamLead.specialization} />
            <Detail
              label="Team Size"
              value={teamLead.teamSize ? `${teamLead.teamSize} Members` : "-"}
            />
            <Detail
              label="Reporting Manager"
              value={teamLead.reportingManager}
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
