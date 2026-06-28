"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart2, TrendingUp } from "lucide-react";

interface AnalyticsChartProps {
  data: any[];
  columns: string[];
}

export default function AnalyticsChart({ data = [], columns = [] }: AnalyticsChartProps) {
  // Safe initializations to protect against undefined errors on mount
  const [xAxisKey, setXAxisKey] = useState(columns?.[0] || "");
  const [yAxisKey, setYAxisKey] = useState(columns?.[1] || "");
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  // Keep state synchronized when columns load in asynchronously from backend
  useEffect(() => {
    if (columns && columns.length > 0) {
      setXAxisKey(columns[0]);
      setYAxisKey(columns[1] || columns[0]);
    }
  }, [columns]);

  if (!data || data.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800/60 rounded-xl p-6 mt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Data Visualization Studio</h3>
          <p className="text-xs text-slate-400 mt-0.5">Plot numerical trends and metrics on-demand</p>
        </div>

        {/* Configurations Toolbar */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* X Axis Control */}
          <div className="flex flex-col">
            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">X-Axis (Labels)</label>
            <select
              value={xAxisKey}
              onChange={(e) => setXAxisKey(e.target.value)}
              className="border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-none bg-slate-800 text-white font-medium cursor-pointer"
            >
              {columns?.map((col) => (
                <option key={col} value={col} className="bg-slate-800 text-white">
                  {col}
                </option>
              ))}
            </select>
          </div>

          {/* Y Axis Control */}
          <div className="flex flex-col">
            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">Y-Axis (Values)</label>
            <select
              value={yAxisKey}
              onChange={(e) => setYAxisKey(e.target.value)}
              className="border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-none bg-slate-800 text-white font-medium cursor-pointer"
            >
              {columns?.map((col) => (
                <option key={col} value={col} className="bg-slate-800 text-white">
                  {col}
                </option>
              ))}
            </select>
          </div>

          {/* Chart Type Selection */}
          <div className="flex flex-col">
            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">Layout</label>
            <div className="flex border border-slate-700 rounded overflow-hidden bg-slate-800">
              <button
                type="button"
                onClick={() => setChartType("bar")}
                className={`p-1.5 transition ${chartType === "bar" ? "bg-blue-600/20 text-blue-400" : "text-slate-500 hover:text-slate-300"}`}
              >
                <BarChart2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setChartType("line")}
                className={`p-1.5 transition ${chartType === "line" ? "bg-blue-600/20 text-blue-400" : "text-slate-500 hover:text-slate-300"}`}
              >
                <TrendingUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Canvas Rendering Area */}
      <div className="h-72 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="#334155" />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="#334155" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
                labelStyle={{ color: '#64748b', fontWeight: 'bold' }}
                cursor={{ fill: 'rgba(51, 65, 85, 0.2)' }} 
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Bar dataKey={yAxisKey} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="#334155" />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="#334155" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
                labelStyle={{ color: '#64748b', fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Line type="monotone" dataKey={yAxisKey} stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}