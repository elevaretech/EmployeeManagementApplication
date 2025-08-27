import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";

/**
 * Internee layout — used for all /internee routes.
 * Put this file at app/internee/layout.tsx
 */

export const metadata = {
  title: "Internee • Elevare Tech",
};

export default function InterneeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // static demo user data (replace with real auth data later)
  const demoUser = {
    name: "Talha Qureshi",
    role: "Intern",
    email: "talha@elevare.com",
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar role="internee" />
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        {/* Header is a client component */}
        {/* <Header title="Internee Dashboard" user={demoUser} /> */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
