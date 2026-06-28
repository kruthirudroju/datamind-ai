// D:\datamind-ai\frontend\app\dashboard\layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { BrainCircuit, LayoutDashboard, Database, Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/datasets", label: "Datasets", icon: Database },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      
      {/* Structural Sidebar Asset */}
      <aside className="w-64 bg-slate-900/50 border-r border-slate-900 p-5 flex flex-col justify-between shrink-0 backdrop-blur-md">
        <div className="space-y-8">
          
          {/* Logo Brand Header */}
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight text-white group">
            <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500/20 transition duration-300">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span>
              DataMind <span className="text-indigo-400">AI</span>
            </span>
          </Link>

          {/* Navigation Matrix */}
          <nav className="space-y-1.5">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition duration-200 group ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  <Icon className={`w-4 h-4 transition ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Account Status Footer Block */}
        <div className="border-t border-slate-900 pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Account Manager</span>
            <span className="text-xs text-slate-400 font-medium mt-0.5">Active Session</span>
          </div>
          <div className="transform hover:scale-105 transition">
            <UserButton />
          </div>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_60%_50%_at_50%_10%,#0f172a_0%,transparent_100%)]">
        {children}
      </main>
    </div>
  );
}