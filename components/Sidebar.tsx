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
//   LogOut

// } from "lucide-react";

// interface SidebarProps {
//   role?: "internee" | "teamlead" | "hr" | "admin";
// }

// export default function Sidebar({ role = "internee" }: SidebarProps) {
//   const path = usePathname();

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
//       label:"Notifications",
//       href:"/intern/notifications",
//       roles: ["internee"],
//       icon: Bell,
//     },
//     {
//       label:"LogOut",
//       href:"/login",
//       roles: ["internee"],
//       icon: LogOut,
//     }
//   ];

//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 flex flex-col">
//       {/* Company Branding */}
//       <div className="mb-8  items-center gap-3 ">
//         <div className="flex justify-center">
//           <Image src="/logo.png" alt="Elevare Tech" height={180} width={180} />
//         </div>
//         <div className="text-xs text-slate-500 mt-4 ml-10">Employee Portal</div>


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
//                 className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   active
//                     ? "bg-blue-50 text-blue-400 border-l-4 border-blue-400"
//                     : "text-slate-700 hover:bg-slate-50"
//                 }`}
//               >
//                 <m.icon className="h-4 w-4" />
//                 {m.label}
//               </Link>
//             );
//           })}
//       </nav>

//       {/* Shortcuts */}
//       <div className="mt-8 border-t pt-6">
//         <div className="mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//           Quick Actions
//         </div>
//         <div className="flex flex-col gap-2">

//           <Link
//             href="/intern/privacy"
//             className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 hover:underline"
//           >
//             <ArrowRightCircle className="h-4 w-4" />
//             Elevare Tech Privacy
//           </Link>
//         </div>
//       </div>
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
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  role?: "internee" | "teamlead" | "hr" | "admin";
}

export default function Sidebar({ role = "internee" }: SidebarProps) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(true);

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
    },
    {
      label: "LogOut",
      href: "/login",
      roles: ["internee"],
      icon: LogOut,
    },
  ];

  return (
    <aside
      className={`${isOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 min-h-screen p-6 flex flex-col transition-all duration-300`}
    >
      {/* Company Branding */}
      <div className="mb-8 items-center gap-3">


        <div className="flex justify-center">


          {isOpen ? (
            <Image src="/logo.png" alt="Elevare Tech" height={180} width={180} />
          ) : (
            <Image src="/logo2.png" alt="Elevare Tech" height={36} width={36} />
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mt-6 flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 text-slate-600"
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
              <Link
                key={m.href}
                href={m.href}
                className={`flex items-center ${isOpen ? "gap-3 px-3 py-2" : "justify-center py-2"
                  } rounded-lg text-sm font-medium transition-colors ${active
                    ? "bg-blue-50 text-blue-400 border-l-4 border-blue-400"
                    : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                <m.icon className="h-5 w-5" />
                {isOpen && m.label}
              </Link>
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

      {/* Toggle Button */}

    </aside>
  );
}

