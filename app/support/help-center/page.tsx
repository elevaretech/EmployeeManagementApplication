"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { question: "What web development services do you provide?", answer: "We build responsive, scalable websites using modern frameworks like React, Next.js, and backend solutions such as Node.js or Python." },
  { question: "Do you develop mobile applications?", answer: "Yes, we create native and cross-platform apps for iOS and Android, including Flutter and React Native solutions." },
  { question: "Can you implement AI solutions for my business?", answer: "Absolutely! We provide AI and data-driven solutions, from predictive analytics to machine learning models tailored to your business needs." },
  { question: "Do you provide UI/UX design services?", answer: "Yes, we offer modern and user-friendly UI/UX designs to enhance user experience across web and mobile platforms." },
  { question: "Do you offer custom software development?", answer: "We develop custom solutions based on your unique requirements, ensuring scalable and maintainable software." },
  { question: "Can you help with data analysis?", answer: "Our team can help analyze your data, build dashboards, and provide actionable insights for better business decisions." },
];

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-white">
        <h1 className="text-5xl font-extrabold text-[#022f62] mb-4 animate-pulse">Help Center & FAQs</h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
          Explore answers to common questions about our futuristic software solutions.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-[#022f62] mb-10 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl overflow-hidden group hover:shadow-[0_0_20px_rgba(0,180,255,0.5)] transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left px-6 py-4 bg-gradient-to-r from-[#022f62] to-[#050a30] text-white font-semibold flex justify-between items-center hover:from-[#050a30] hover:to-[#022f62] transition-colors duration-500"
              >
                {faq.question}
                {openIndex === index ? <ChevronUp className="text-[#50b4f1]" /> : <ChevronDown className="text-[#50b4f1]" />}
              </button>
              <div
                className={`px-6 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 py-4 bg-[#f5faff] text-gray-900 border-t border-gray-200" : "max-h-0"
                }`}
              >
                <p className="text-gray-800">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
