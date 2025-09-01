// app/contact/layout.tsx
import { ReactNode } from "react";
import  Header  from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Projects • Elevare Tech",
  description: "Explore our innovative projects and solutions.",
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Website Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 bg-white">
        {children}
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
