"use client";

import { motion, Variants, Transition } from "framer-motion";
import Link from "next/link";

const highlights = [
  {
    title: "Innovative Solutions",
    description:
      "We design and deliver cutting-edge software solutions tailored to your business needs, leveraging the latest technologies and best practices.",
  },
  {
    title: "Expert Team",
    description:
      "Our developers, designers, and strategists collaborate to ensure every project is crafted with precision, efficiency, and creativity.",
  },
  {
    title: "Client-Centric Approach",
    description:
      "We put our clients first, ensuring transparent communication, timely delivery, and solutions that exceed expectations.",
  },
  {
    title: "AI & Automation",
    description:
      "We integrate AI-driven solutions and automation to optimize business processes, increase productivity, and reduce costs.",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Our solutions empower businesses to make informed decisions through robust data analytics and insights.",
  },
];

// Define a reusable transition for cards
const cardTransition: Transition = { duration: 0.6, ease: [0.42, 0, 0.58, 1] };

const highlightVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...cardTransition, delay: custom * 0.2 },
  }),
};

export default function AboutSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-20 px-5 md:px-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          About Elevare Tech
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Elevare Tech is a forward-thinking software development company that
          transforms ideas into innovative, scalable, and reliable digital
          solutions. We specialize in web and mobile applications, AI-driven
          automation, custom software solutions, and data analytics. Our goal is
          to empower businesses with technology that drives success.
        </p>
      </motion.div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Our Mission
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            To deliver high-quality, innovative software solutions that empower
            businesses to thrive in the digital era.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Our Vision
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            To be a leading software development company known for innovative
            solutions, exceptional client service, and impactful digital
            transformations worldwide.
          </p>
        </motion.div>
      </div>

      {/* Highlight Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {highlights.map((item, index) => (
          <motion.div
            key={item.title}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={highlightVariants}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {item.title}
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CEO Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
        className="bg-[#f0f7ff] p-8 rounded-xl border-l-4 border-[#50b4f1] mb-16"
      >
        <h2 className="text-2xl font-semibold text-[#022f62] mb-4">
          Message from the CEO
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          At Elevare Tech, our mission is to empower businesses with
          cutting-edge technology solutions that drive growth, efficiency, and
          innovation. From our humble beginnings, we have always believed that
          technology is not just a tool, but a catalyst for transformation. Our
          dedicated team works tirelessly to craft software that is not only
          functional but intuitive, scalable, and impactful.
          <br />
          <br />
          We value integrity, collaboration, and excellence in every project we
          undertake. Every challenge is an opportunity to learn, adapt, and
          deliver value to our clients. As we continue to expand and evolve, our
          focus remains unwavering: to build meaningful digital experiences that
          make a real difference for businesses and communities alike.
          <br />
          <br />
          On behalf of the entire Elevare Tech family, I invite you to explore
          our services and discover how we can partner with you to achieve your
          goals. Together, let's shape the future of technology.
          <br />
          <br />
          <span className="font-semibold">CEO, Elevare Tech</span>
        </p>
      </motion.div>

      {/* Contact Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Link
          href="/contact"
          className="bg-[#022f62] hover:bg-[#50b4f1] text-white px-8 py-4 rounded font-semibold transition duration-300"
        >
          Contact Us
        </Link>
      </motion.div>
    </section>
  );
}
