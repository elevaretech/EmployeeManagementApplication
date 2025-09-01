"use client";

import { useState } from "react";

type Job = {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
  applyLink: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer (React.js)",
    location: "Remote / Pakistan",
    type: "Internship / Full-Time",
    description:
      "Work on building responsive web applications with React.js, collaborate with designers and backend team.",
    applyLink: "mailto:hr@elevaretech.site?subject=Application%20Frontend%20Developer",
  },
  {
    id: 2,
    title: "Backend Developer (Python/FastAPI)",
    location: "Remote / Pakistan",
    type: "Internship / Full-Time",
    description:
      "Develop and maintain scalable APIs, handle databases, and optimize backend services.",
    applyLink: "mailto:hr@elevaretech.site?subject=Application%20Backend%20Developer",
  },
  {
    id: 3,
    title: "Flutter Developer",
    location: "Remote / Pakistan",
    type: "Internship / Full-Time",
    description:
      "Build cross-platform mobile applications, integrate APIs, and collaborate with design team.",
    applyLink: "mailto:hr@elevaretech.site?subject=Application%20Flutter%20Developer",
  },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 mt-16">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-[#022f62] to-[#50b4f1] text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Join Our Team</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          Elevare Tech is looking for passionate professionals and interns to build innovative software solutions.
        </p>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#022f62] mb-8 text-center">Why Work With Us</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Innovative Projects</h3>
            <p className="text-gray-700">Work on cutting-edge technologies and real-world projects that impact thousands of users.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Career Growth</h3>
            <p className="text-gray-700">Continuous learning, mentorship, and opportunities to advance your career in tech.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Flexible Environment</h3>
            <p className="text-gray-700">Remote-friendly, flexible hours, and a supportive team culture to help you thrive.</p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#022f62] mb-8 text-center">Open Positions</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <h3 className="font-semibold text-xl mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-1">{job.location}</p>
              <p className="text-gray-500 mb-3">{job.type}</p>
              <button className="text-[#50b4f1] font-semibold underline">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 shadow-2xl  flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-lg w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
              onClick={() => setSelectedJob(null)}
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-[#022f62] mb-4">{selectedJob.title}</h3>
            <p className="text-gray-600 mb-2">{selectedJob.location}</p>
            <p className="text-gray-500 mb-4">{selectedJob.type}</p>
            <p className="text-gray-700 mb-6">{selectedJob.description}</p>
            <a
              href={selectedJob.applyLink}
              className="bg-[#022f62] hover:bg-[#50b4f1] text-white px-6 py-3 rounded font-semibold transition"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-[#022f62] mb-4">Can't Find the Right Role?</h2>
        <p className="text-gray-700 mb-6">Send us your resume and we’ll reach out when a position matches your skills.</p>
        <a
          href="mailto:hr@elevaretech.site?subject=General%20Application"
          className="bg-[#022f62] hover:bg-[#50b4f1] text-white px-8 py-4 rounded font-semibold transition"
        >
          Submit Resume
        </a>
      </section>
    </div>
  );
}
