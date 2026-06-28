// D:\datamind-ai\frontend\app\page.tsx
"use client";

import Link from "next/link";
import { BarChart3, ArrowRight, Database, Sparkles, LayoutDashboard, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-indigo-500/30">
      
      {/* Premium Decorative Glow Effects & Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-r from-indigo-500/20 to-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[400px] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center justify-center min-h-screen">
        
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 text-xs text-indigo-300 mb-8 backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-medium text-slate-300">Introducing Version 2.0</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl space-y-6 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500">
            DataMind <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400">AI</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
            Ingest raw datasets, execute high-speed exploratory visual architectures, and uncover deep automated metric layers instantly.
          </p>

          {/* Core Call to Action */}
          <div className="pt-4">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-xl transition duration-300 shadow-lg shadow-indigo-500/20 group transform hover:-translate-y-0.5"
            >
              Launch Core Workspace
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          
          {/* Card 1 */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-800/80 transition duration-300 group">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit group-hover:bg-indigo-500/20 transition">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mt-4">Vector Vectorization</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Process raw text arrays and cast string mutations flawlessly into safe structured formats database side.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-800/80 transition duration-300 group">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit group-hover:bg-blue-500/20 transition">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mt-4">Visualization Engine</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Dynamically parse parameters to display multi-axis high-contrast plot layouts using Recharts tools.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-800/80 transition duration-300 group">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit group-hover:bg-purple-500/20 transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mt-4">Secure Middleware</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Fully protected application state paths built over strict Clerk credential tracking pipelines.
            </p>
          </div>

        </div>

        {/* Footer Area */}
        <div className="mt-20 text-center border-t border-slate-900/60 pt-8 w-full">
          <p className="text-xs text-slate-600 font-medium">
            Powered by Next.js Server Modules & Interactive Matrix Frameworks.
          </p>
        </div>

      </div>
    </div>
  );
}