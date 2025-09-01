"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

// Fetch EmailJS env variables
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setStatus("Failed to send message. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6 mt-10">
      <h1 className="text-4xl md:text-5xl font-bold text-[#022f62] mb-6 text-center">
        Contact Us
      </h1>
      <p className="text-center max-w-xl mx-auto text-gray-600 mb-12">
        Have a question or need support? Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form 
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block mb-2 font-medium" htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name" 
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#50b4f1]"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium" htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email" 
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#50b4f1]"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium" htmlFor="message">Message</label>
          <textarea 
            id="message" 
            rows={5} 
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message" 
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#50b4f1]"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-[#50b4f1] text-white font-semibold py-3 rounded-md hover:bg-[#38a1e0] transition-colors"
        >
          Send Message
        </button>
        {status && <p className="text-center mt-2 text-green-500">{status}</p>}
      </form>
    </div>
  );
}
