"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  role?: "internee" | "teamlead" | "hr" | "admin";
}

export default function Sidebar({ role = "internee" }: SidebarProps) {
  const path = usePathname();

  const menu = [
    { label: "Dashboard", href: "/intern", roles: ["internee"] },
    { label: "Tasks", href: "/intern/tasks", roles: ["internee"] },
    { label: "Attendance", href: "/intern/attendance", roles: ["internee"] },
    { label: "Projects", href: "/intern/projects", roles: ["internee"] },
    { label: "Profile", href: "/intern/profile", roles: ["internee"] },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-5">
      <div className="mb-6 flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-md"
          style={{ background: "#002B5C" }}
        />
        <div>
          <div className="text-lg font-semibold text-slate-800">
            Elevare Tech
          </div>
          <div className="text-xs text-slate-500">Employee Portal</div>
        </div>
      </div>

      <nav className="space-y-1">
        {menu
          .filter((m) => m.roles.includes(role))
          .map((m) => {
            const active = path === m.href;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {m.label}
              </Link>
            );
          })}
      </nav>

      <div className="mt-6 pt-6 border-t text-xs text-slate-500">
        <div className="mb-2">Shortcuts</div>
        <Link
          href="/internee/tasks"
          className="block text-slate-600 hover:underline"
        >
          Open Tasks
        </Link>
        <Link
          href="/internee/attendance"
          className="block text-slate-600 hover:underline mt-1"
        >
          Mark Attendance
        </Link>
      </div>
    </aside>
  );
}
