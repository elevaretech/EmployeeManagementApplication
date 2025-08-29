// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import {
//   LayoutDashboard,
//   CheckSquare,
//   CalendarCheck,
//   User,
//   ArrowRightCircle,
//   Bell,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useState } from "react";

// interface SidebarProps {
//   role?: "internee" | "teamlead" | "hr" | "admin";
// }

// export default function Sidebar({ role = "internee" }: SidebarProps) {
//   const path = usePathname();
//   const [isOpen, setIsOpen] = useState(true);

//   const menu = [
//     {
//       label: "Dashboard",
//       href: "/intern",
//       roles: ["internee"],
//       icon: LayoutDashboard,
//     },
//     {
//       label: "Tasks",
//       href: "/intern/tasks",
//       roles: ["internee"],
//       icon: CheckSquare,
//     },
//     {
//       label: "Attendance",
//       href: "/intern/attendance",
//       roles: ["internee"],
//       icon: CalendarCheck,
//     },
//     {
//       label: "Profile",
//       href: "/intern/profile",
//       roles: ["internee"],
//       icon: User,
//     },
//     {
//       label: "Notifications",
//       href: "/intern/notifications",
//       roles: ["internee"],
//       icon: Bell,
//     },
//     {
//       label: "LogOut",
//       href: "/login",
//       roles: ["internee"],
//       icon: LogOut,
//     },
//   ];

//   return (
//     <aside
//       className={`${isOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 min-h-screen p-6 flex flex-col transition-all duration-300`}
//     >
//       {/* Company Branding */}
//       <div className="mb-8 items-center gap-3">


//         <div className="flex justify-center">


//           {isOpen ? (
//             <Image src="/logo.png" alt="Elevare Tech" height={180} width={180} />
//           ) : (
//             <Image src="/logo2.png" alt="Elevare Tech" height={36} width={36} />
//           )}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="mt-6 flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 text-slate-600"
//           >
//             {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-3 w-3" />}
//           </button>
//         </div>
//         {isOpen && (
//           <div className="text-xs text-slate-500 mt-4 ml-10">Employee Portal</div>
//         )}

//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 space-y-1">
//         {menu
//           .filter((m) => m.roles.includes(role))
//           .map((m) => {
//             const active = path === m.href;
//             return (
//               <Link
//                 key={m.href}
//                 href={m.href}
//                 className={`flex items-center ${isOpen ? "gap-3 px-3 py-2" : "justify-center py-2"
//                   } rounded-lg text-sm font-medium transition-colors ${active
//                     ? "bg-blue-50 text-blue-400 border-l-4 border-blue-400"
//                     : "text-slate-700 hover:bg-slate-50"
//                   }`}
//               >
//                 <m.icon className="h-5 w-5" />
//                 {isOpen && m.label}
//               </Link>
//             );
//           })}
//       </nav>

//       {/* Shortcuts */}
//       <div className="mt-8 border-t pt-6">
//         {isOpen && (
//           <div className="mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//             Quick Actions
//           </div>
//         )}
//         <div className="flex flex-col gap-2">
//           <Link
//             href="/intern/privacy"
//             className={`flex items-center ${isOpen ? "gap-2 text-sm" : "justify-center"
//               } text-slate-600 hover:text-blue-700 hover:underline`}
//           >
//             <ArrowRightCircle className="h-4 w-4" />
//             {isOpen && "Elevare Tech Privacy"}
//           </Link>
//         </div>
//       </div>

//       {/* Toggle Button */}

//     </aside>
//   );
// }


"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  CheckSquare,
  CalendarCheck,
  User,
  ArrowRightCircle,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  role?: "internee" | "teamlead" | "hr" | "admin";
}

export default function Sidebar({ role = "internee" }: SidebarProps) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menu = [
    {
      label: "Dashboard",
      href: "/intern",
      roles: ["internee"],
      icon: LayoutDashboard,
    },
    {
      label: "Tasks",
      href: "/intern/tasks",
      roles: ["internee"],
      icon: CheckSquare,
    },
    {
      label: "Attendance",
      href: "/intern/attendance",
      roles: ["internee"],
      icon: CalendarCheck,
    },
    {
      label: "Profile",
      href: "/intern/profile",
      roles: ["internee"],
      icon: User,
    },
    {
      label: "Notifications",
      href: "/intern/notifications",
      roles: ["internee"],
      icon: Bell,
      badge: 3, // 🔴 later replace with dynamic DB count
    },
    {
      label: "LogOut",
      href: "#", // prevent auto nav, handle manually
      roles: ["internee"],
      icon: LogOut,
      logout: true,
    },

    //TeamLead
    {
    label: "Dashboard",
    href: "/teamlead",
    roles: ["teamlead"],
    icon: LayoutDashboard,
  },
  {
    label: "Manage Team",
    href: "/teamlead/team",
    roles: ["teamlead"],
    icon: User,
  },
  {
    label: "Projects",
    href: "/teamlead/projects",
    roles: ["teamlead"],
    icon: CheckSquare,
  },
  {
    label: "Reports",
    href: "/teamlead/reports",
    roles: ["teamlead"],
    icon: CalendarCheck,
  },
  {
    label: "Notifications",
    href: "/teamlead/notifications",
    roles: ["teamlead"],
    icon: Bell,
    badge: 5,
  },
  {
    label: "Profile",
    href: "/teamlead/profile",
    roles: ["teamlead"],
    icon: User,
  },
  {
    label: "LogOut",
    href: "#",
    roles: ["teamlead"],
    icon: LogOut,
    logout: true,
  },

  {
    label: "Dashboard",
    href: "/hr",
    roles: ["hr"],
    icon: LayoutDashboard,
  },
  {
    label: "View Employees",
    href: "/hr/employees",
    roles: ["hr"],
    icon: User,
  },
  {
    label: "Leave & Attendance",
    href: "/hr/leaveattendance",
    roles: ["hr"],
    icon: FileText,
  },
  {
    label: "Projects",
    href: "/hr/projects",
    roles: ["hr"],
    icon: CheckSquare,
  },
   {
    label: "Notifications",
    href: "/hr/notifications",
    roles: ["hr"],
    icon: Bell,
    badge: 3, // Example unread notifications
  },
  {
    label: "Profile",
    href: "/hr/profile",
    roles: ["hr"],
    icon: User,
  },
  {
    label: "LogOut",
    href: "#",
    roles: ["hr"],
    icon: LogOut,
    logout: true,
  },
  ];

  return (
    <>
      <aside
        className={`${isOpen ? "w-64" : "w-20"
          } bg-white border-r border-gray-200 min-h-screen p-6 flex flex-col transition-all duration-300`}
      >
        {/* Company Branding */}
        <div className="mb-8 items-center gap-3">
          <div className="flex justify-center relative">
            {isOpen ? (
              <Image src="/logo.png" alt="Elevare Tech" height={180} width={180} />
            ) : (
              <Image src="/logo2.png" alt="Elevare Tech" height={36} width={36} />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute -right-5 top-1/2 transform -translate-y-1/2 flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-3 w-3" />}
            </button>
          </div>
          {isOpen && (
            <div className="text-xs text-slate-500 mt-4 ml-10">Employee Portal</div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {menu
            .filter((m) => m.roles.includes(role))
            .map((m) => {
              const active = path === m.href;

              return (
                <div key={m.href} className="relative group">
                  {/* If Logout → show button with modal trigger */}
                  {m.logout ? (
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className={`w-full flex items-center ${isOpen ? "gap-3 px-3 py-2" : "justify-center py-2"
                        } rounded-lg text-sm font-medium transition-colors ${active
                          ? "bg-blue-50 text-blue-400 border-l-4 border-blue-400 shadow"
                          : "text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                      <m.icon className="h-5 w-5" />
                      {isOpen && m.label}
                    </button>
                  ) : (
                    <Link
                      href={m.href}
                      className={`flex items-center ${isOpen ? "gap-3 px-3 py-2" : "justify-center py-2"
                        } rounded-lg text-sm font-medium transition-colors ${active
                          ? "bg-blue-50 text-blue-400 border-l-4 border-blue-400"
                          : "text-slate-700 hover:bg-slate-50"
                        } relative`}
                    >
                      <m.icon className="h-5 w-5" />
                      {isOpen && m.label}

                      {/* 🔴 Notification badge */}
                      {m.badge && (
                        <span className="absolute right-2 top-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {m.badge}
                        </span>
                      )}
                    </Link>
                  )}

                  {/* 💡 Tooltip when sidebar collapsed */}
                  {!isOpen && (
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {m.label}
                    </span>
                  )}
                </div>
              );
            })}
        </nav>

        {/* Shortcuts */}
        <div className="mt-8 border-t pt-6">
          {isOpen && (
            <div className="mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Quick Actions
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Link
              href="/intern/privacy"
              className={`flex items-center ${isOpen ? "gap-2 text-sm" : "justify-center"
                } text-slate-600 hover:text-blue-700 hover:underline`}
            >
              <ArrowRightCircle className="h-4 w-4" />
              {isOpen && "Elevare Tech Privacy"}
            </Link>
          </div>
        </div>
      </aside>

      {/* 🚪 Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 shadow-2xl shadow-blue-800">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-slate-500">Confirm Logout</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-400 rounded-lg "
              >
                Cancel
              </button>
              <Link
                href="/login"
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => setShowLogoutModal(false)}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
