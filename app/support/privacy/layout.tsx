// app/contact/layout.tsx
import { ReactNode } from "react";
import  Header  from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy • Elevare Tech",
  description: "Learn about our privacy practices and how we protect your data.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
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
