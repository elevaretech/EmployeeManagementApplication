"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  media: string[];
  type: "image" | "video";
  category: string | string[];
  techStack?: string[];
  demoLink?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "WanderBlaze – Ai based Web Platform for Tourists and Developers",
    description: ` WanderBlaze is a modern, responsive web application developed with Next.js and Tailwind 
CSS, designed to serve two distinct types of users through a single platform. The project 
introduces a dual-mode experience: 
• Tourist Mode: Focused on travel enthusiasts, offering guides, FAQs, and clear calls-to
action to begin exploring. 
• Developer Mode: Tailored to technical users, providing access to APIs, documentation, 
technical FAQs, and developer-focused resources. `,
    media: ["/projects/wanderblaze.mp4"],
    type: "video",
    category: ["Web", "AI"],
    techStack: ["Next.js", "FastAPI", "PostgreSQL"],
    // demoLink: "#",
  },
  {
    id: 2,
    title: "Clicon E-commerce Website",
    description: `An E-commerce Website with Admin Panel is a full-stack web application designed to provide customers with a seamless shopping experience and give admins complete control over the system. The frontend is built in Next.js, ensuring fast, modern, and responsive UI with smooth navigation, while the backend is powered by Node.js with Express.js and MongoDB to manage users, products, and orders efficiently. Customers can browse products, view details, add items to the cart, and place secure orders.`,
    media: ["/projects/ecommerce.png"],
    type: "image",
    category: "Web",
    techStack: ["Next.js", "Express.js", "MongoDB"],
  },
  {
    id: 3,
    title: "AI Agent Development Personal, Business & Website Automation",
    description: `AI Agents are the solution intelligent digital assistants that can be tailored for personal productivity, websites, and business applications. 
This project offers the development of custom AI agents that act as virtual assistants, capable of 
handling tasks such as: 
• Answering customer queries on websites 
• Guiding users through apps 
• Acting as personal fitness or learning coaches 
• Supporting business operations like travel booking, real estate assistance, legal help, and 
more`,
    media: ["/projects/agents.png"],
    type: "image",
    category: "AI",
    techStack: ["Python", "TensorFlow", "NLP", "LLMs"],
    // demoLink: "#",
  },
  {
    id: 4,
    title: "eCommerce Sales Analysis and Forecasting",
    description: `Analyzed sales trends, customer behavior, and product performance across multiple categories using Python, Pandas, and Seaborn. Developed forecasting models with Linear Regression and ElasticNet to predict future sales and support data-driven decision-making. 

Created a comprehensive dashboard in Looker Studio to provide real-time insights into sales, profits, and growth potential, enabling actionable business strategies.`,
    media: ["/projects/3.jpg", "/projects/2.jpg", "/projects/1.jpg"],
    type: "image",
    category: "Data Analysis",
    techStack: ["Power BI", "Looker", "Python"],
  },
  {
    id: 5,
    title: "Infra – AI Resume Screener for HR",
    description: `  Infra is an AI-powered resume screening tool designed to streamline the hiring process for HR professionals and recruiters. By analyzing resumes efficiently and presenting results in an interactive dashboard, Infra reduces manual effort, improves candidate shortlisting accuracy, and speeds up the recruitment cycle.  `,
    media: ["/projects/infra.mp4"],
    type: "video",
    category: ["Web", "AI"],
    techStack: ["React.js", "FastAPI", "PostgreSQL"],
    // demoLink: "#",
  },
  {
    id: 6,
    title: "Blogging Website",
    description: `This Website is a modern blogging platform built with Next.js on the frontend, designed for speed, responsiveness, and a smooth reading experience. It allows users to explore blog posts through a clean and intuitive UI, with features like dynamic routing for individual articles, a homepage showcasing the latest content, and mobile-first responsive design powered by Tailwind CSS. The use of Next.js ensures server-side rendering (SSR) and static site generation (SSG), giving the SEO.`,
    media: ["/projects/blogging.png"],
    type: "image",
    category: "Web",
    techStack: ["React.js", "Express.js", "MongoDB"],
  },
  {
    id: 7,
    title: "Retail Sales Dashboard & Forecasting",
    description: `Retail sales data and developed a forecasting model to predict future sales. Key activities included:
- Conducting Exploratory Data Analysis (EDA) to identify trends and patterns
- Building forecasting models using Linear Regression and ARIMA
- Designing an interactive dashboard in Power BI to visualize key metrics`,
    media: ["/projects/2.jpg"],
    type: "image",
    category: "Data Analysis",
    techStack: ["Power BI", "Looker", "Python"],
  },
  {
    id: 8,
    title: "Supply Chain Optimization",
    description:
      "Optimized inventory, shipping, and manufacturing processes using advanced analytics and machine learning (ARIMA). Developed an interactive Power BI dashboard to monitor key metrics, forecast demand, and support data-driven decision-making. Technologies used: Python (Pandas, NumPy), Power BI, Matplotlib, Seaborn.",
    media: ["/projects/1.jpg"],
    type: "image",
    category: "Data Analysis",
    techStack: ["Power BI", "Looker", "Python"],
  },
];

const categories = ["All", "Web", "Mobile", "AI", "Data Analysis"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) =>
          Array.isArray(p.category)
            ? p.category.includes(selectedCategory)
            : p.category === selectedCategory
        );
  return (
    <div className="bg-gray-50 min-h-screen mt-16">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-r from-[#022f62] to-[#50b4f1] text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Our Projects
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
          Innovative solutions crafted across web, mobile, AI, and data
          analytics to empower businesses.
        </p>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto py-12 px-6 flex justify-center gap-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto py-12 px-6 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative w-full h-64 overflow-hidden">
              {project.type === "image" ? (
                <Image
                  src={project.media[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <video
                  src={project.media[0]}
                  loop
                  muted
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {project.category}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {project.description}
              </p>
              <span className="text-blue-600 font-semibold">Click to View</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-80 overflow-hidden">
                {selectedProject.type === "image" ? (
                  <Image
                    src={selectedProject.media[0]}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <video
                    src={selectedProject.media[0]}
                    autoPlay
                    loop
                    muted
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-white bg-gray-800/60 hover:bg-gray-900/80 p-2 rounded-full"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-3">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-700 mb-4">
                  {selectedProject.description}
                </p>
                {selectedProject.techStack && (
                  <p className="mb-4">
                    <span className="font-semibold">Tech Stack:</span>{" "}
                    {selectedProject.techStack.join(", ")}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
