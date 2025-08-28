import Sidebar from "@/components/Sidebar";
export const metadata = {
  title: "Internee • Elevare Tech",
};

export default function InterneeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <div className="min-h-screen flex">
      <Sidebar role="teamlead" />
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        {/* Header is a client component */}
        {/* <Header title="Internee Dashboard" user={demoUser} /> */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
