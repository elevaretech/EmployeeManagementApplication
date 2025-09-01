"use client";

import { motion } from "framer-motion";
import { JSX } from "react";
import {
  FiGlobe,
  FiSmartphone,
  FiCpu,
  FiLayout,
  FiCode,
  FiBarChart2,
} from "react-icons/fi";

type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: JSX.Element;
};

const services: Service[] = [
  {
    id: 1,
    title: "Web App Development",
    description:
      "We design and develop high-performance web applications using the latest technologies for a seamless user experience.",
    image: "/services/web2.png",
    icon: <FiGlobe size={32} />,
  },
  {
    id: 2,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps with Flutter and React Native, optimized for speed, usability, and scalability.",
    image: "/services/mobile.avif",
    icon: <FiSmartphone size={32} />,
  },
  {
    id: 3,
    title: "AI & Automation",
    description:
      "Implement intelligent automation and AI-driven solutions to streamline processes, boost efficiency, and deliver actionable insights.",
    image: "/services/ai.webp",
    icon: <FiCpu size={32} />,
  },
  {
    id: 4,
    title: "UI & UX Design",
    description:
      "Create intuitive and engaging interfaces that provide a smooth, enjoyable experience for your users across all platforms.",
    image: "/services/uiux.avif",
    icon: <FiLayout size={32} />,
  },
  {
    id: 5,
    title: "Custom Software Development",
    description:
      "Tailored software solutions built to meet your specific business needs, with high scalability and maintainability.",
    image: "/services/customsoftware dev.webp",
    icon: <FiCode size={32} />,
  },
  {
    id: 6,
    title: "Data Analysis",
    description:
      "Transform raw data into actionable insights using advanced analytics and visualization tools to drive smarter decisions.",
    image: "/services/dataanalysis.jpg",
    icon: <FiBarChart2 size={32} />,
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  return (
    <div className="bg-gray-50 min-h-screen mt-16">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-[#022f62] to-[#50b4f1] text-white relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          Elevare Tech provides innovative technology solutions to help your
          business grow.
        </p>
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-[#50b4f1]/20 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-64 h-64 bg-[#022f62]/20 rounded-full translate-x-1/2 translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 space-y-24">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                isEven ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Text Content */}
              <div className="md:w-1/2 space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 mb-4 text-[#022f62]"
                >
                  <motion.div
                    whileHover={{ rotate: 20 }}
                    className="bg-[#50b4f1]/10 p-3 rounded-full"
                  >
                    {service.icon}
                  </motion.div>
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                </motion.div>
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Image */}
              <div className="md:w-1/2 relative group">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="rounded-xl shadow-2xl border border-gray-200 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  whileHover={{ rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                {/* Accent Overlay */}
                <motion.div
                  className="absolute top-4 left-4 w-20 h-20 bg-[#022f62]/20 rounded-full blur-xl opacity-70"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-[#022f62] mb-4">
          Want to Work With Us?
        </h2>
        <p className="text-gray-700 mb-6">
          Let&aspos;s discuss how our tech solutions can take your business to
          the next level.
        </p>
        <a
          href="/contact"
          className="bg-[#022f62] hover:bg-[#50b4f1] text-white px-8 py-4 rounded font-semibold transition-transform transform hover:scale-105"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
