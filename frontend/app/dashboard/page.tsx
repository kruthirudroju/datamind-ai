// D:\datamind-ai\frontend\app\dashboard\page.tsx
"use client";

import { Cpu, TrendingUp, Sparkles, RefreshCw, BarChart2 } from "lucide-react";

export default function DashboardOverview() {
  const cards = [
    {
      title: "Model Compute",
      value: "Optimal",
      desc: "Resource cluster balance healthy",
      icon: Cpu,
      colorClass: "text-indigo-400 bg-indigo-500/10 border-indigo-500/10",
    },
    {
      title: "Analysis Jobs",
      value: "99.4% Acc.",
      desc: "Analytical calculation accuracy peak",
      icon: TrendingUp,
      colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/10",
    },
    {
      title: "Active Instances",
      value: "Production",
      desc: "Live stream ingestion node operational",
      icon: Sparkles,
      colorClass: "text-amber-400 bg-amber-500/10 border-amber-500/10",
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Title Header Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Workspace Overview</h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitor pipeline health metrics and processed analytical configurations.
          </p>
        </div>
        
        {/* Status System Action Pill */}
        <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-300 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">System Streams Online</span>
        </div>
      </div>

      {/* Grid Layout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div 
              key={i} 
              className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-800/60 transition duration-300 group relative overflow-hidden"
            >
              {/* Soft Inner card highlight gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${card.colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-900 px-2 py-0.5 rounded-md">Live</span>
              </div>
              
              <div className="mt-4 space-y-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.title}</p>
                <p className="text-3xl font-bold tracking-tight text-white">{card.value}</p>
              </div>

              <p className="text-xs text-slate-500 mt-3 border-t border-slate-900/60 pt-3 leading-relaxed">
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Expanded Canvas Placeholder for Chart Integration */}
      <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-slate-400 mb-4">
          <BarChart2 className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Operational Analytics Canvas</h3>
        </div>
        <div className="h-48 rounded-xl border border-dashed border-slate-900 flex flex-col items-center justify-center text-center p-6">
          <RefreshCw className="w-5 h-5 text-slate-700 animate-spin-slow mb-2" />
          <p className="text-sm text-slate-400 font-medium">Ready to map tabular database data streams</p>
          <p className="text-xs text-slate-600 mt-1 max-w-xs">Use the left menu to navigate to your uploaded files to trigger immediate metric render operations.</p>
        </div>
      </div>

    </div>
  );
}