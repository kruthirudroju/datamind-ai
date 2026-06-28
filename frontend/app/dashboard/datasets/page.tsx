"use client";

import { useState, useEffect } from "react";
import { getDatasets, saveDatasetToDb, deleteDataset } from "../../actions/datasetActions";
import AnalyticsChart from "../../../components/AnalyticsChart";
import { Database, FileText, Trash2, UploadCloud, Loader2, BarChart3 } from "lucide-react";

export default function DatasetsDashboardPage() {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [activeDataset, setActiveDataset] = useState<any | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load datasets immediately upon mount
  useEffect(() => {
    async function loadInitialData() {
      try {
        const data = await getDatasets();
        setDatasets(data);
        if (data && data.length > 0) {
          setActiveDataset(data[0]); // Default to first available entry for charts
        }
      } catch (err) {
        console.error("Failed to load records:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // Comprehensive operational client file processor and parser
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
        
        if (lines.length === 0) throw new Error("Empty CSV file");

        // Parse explicit row names and clean up bounding data artifacts
        const headers = lines[0].split(",").map(h => h.replace(/^["']|["']$/g, "").trim());
        
        // Build data blocks safely out of raw split elements
        const previewRows = lines.slice(1, 15).map(line => {
          const values = line.split(",");
          const rowObj: any = {};
          headers.forEach((header, index) => {
            const rawVal = values[index]?.replace(/^["']|["']$/g, "").trim() || "";
            // Keep numerical conversion clean for rendering
            rowObj[header] = !isNaN(Number(rawVal)) && rawVal !== "" ? Number(rawVal) : rawVal;
          });
          return rowObj;
        });

        // Sync with your stabilized backend transaction model
        const savedRecord = await saveDatasetToDb({
          name: file.name,
          size: file.size,
          rowCount: lines.length - 1,
          columnCount: headers.length,
          columnNames: headers,
          previewRows: previewRows
        });

        // Update application state layout flawlessly
        const updatedList = await getDatasets();
        setDatasets(updatedList);
        setActiveDataset(updatedList.find((d: any) => d.id === savedRecord?.id) || updatedList[0]);
      } catch (err: any) {
        alert(err.message || "Parsing error occurred during dataset upload.");
      } finally {
        setIsUploading(false);
        e.target.value = ""; // clear inputs cleanly
      }
    };

    reader.readAsText(file);
  }

  // Deletion helper layout mapping
  async function handleRowDeletion(id: string, e: React.MouseEvent) {
    e.stopPropagation(); // Stop selection mutation
    if (!confirm("Are you sure you want to drop this asset?")) return;

    try {
      await deleteDataset(id);
      const updatedList = await getDatasets();
      setDatasets(updatedList);
      if (activeDataset?.id === id) {
        setActiveDataset(updatedList.length > 0 ? updatedList[0] : null);
      }
    } catch (err) {
      alert("Failed to securely purge entry.");
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center flex-col gap-2">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs text-zinc-400">Synchronizing database vectors...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header Element */}
      <div className="flex justify-between items-center border-b pb-4 border-zinc-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Mind Engine Workspace</h1>
          <p className="text-zinc-500 mt-1">Upload files and switch selections below to generate graphs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* left interaction pane */}
        <div className="space-y-6 lg:col-span-1">
          {/* File Upload interactive dropping mechanism */}
          <label className="border-2 border-dashed border-zinc-300 rounded-xl p-6 text-center flex flex-col items-center justify-center bg-zinc-50/50 hover:bg-zinc-50 cursor-pointer transition min-h-[200px] relative">
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
                <h4 className="font-semibold text-sm">Processing Matrix Data...</h4>
              </>
            ) : (
              <>
                <UploadCloud className="w-10 h-10 text-zinc-400 mb-3" />
                <h4 className="font-semibold text-sm">Upload CSV File</h4>
                <p className="text-xs text-zinc-400 mt-1">Click to browse your datamind files</p>
              </>
            )}
          </label>

          {/* Active List Panel Wrapper */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-500" />
              Your Loaded Datasets ({datasets.length})
            </h3>

            {datasets.length === 0 ? (
              <div className="text-xs text-zinc-400 border border-dashed rounded-xl p-8 text-center bg-white">
                No datasets in database. Upload a CSV to initialize analytics.
              </div>
            ) : (
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {datasets.map((dataset) => {
                  const isSelected = activeDataset?.id === dataset.id;
                  return (
                    <div
                      key={dataset.id}
                      onClick={() => setActiveDataset(dataset)}
                      className={`p-3.5 border rounded-xl flex items-center justify-between cursor-pointer transition ${
                        isSelected 
                          ? "border-blue-500 bg-blue-50/40 shadow-sm" 
                          : "border-zinc-200 bg-white hover:bg-zinc-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-blue-500" : "text-zinc-400"}`} />
                        <div className="truncate pr-2">
                          <p className="text-sm font-semibold truncate text-black">{dataset.filename}</p>
                          <p className="text-[11px] text-zinc-400 font-medium">Rows: {dataset.rowCount || 0} | Columns: {dataset.columnCount || 0}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleRowDeletion(dataset.id, e)}
                        className="text-zinc-300 hover:text-red-500 p-1 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right workspace visualization display box - Custom Plot Colors Visibility Fix */}
        <div className="lg:col-span-2">
          {activeDataset ? (
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-5 flex items-center gap-4">
                <div className="p-3 bg-slate-800 text-blue-400 rounded-lg">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{activeDataset.filename}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Storage Size: {(Number(activeDataset.size) / 1024).toFixed(2)} KB | Compiled on {new Date(activeDataset.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* The chart wrapper environment is now dark, allowing the plot vectors and colors to shine through cleanly */}
              <div className="bg-slate-900/40 border border-slate-800/40 rounded-xl p-2">
                <AnalyticsChart 
                  data={
                    Array.isArray(activeDataset.previewRows) 
                      ? activeDataset.previewRows 
                      : typeof activeDataset.previewRows === "string"
                        ? JSON.parse(activeDataset.previewRows)
                        : Object.values(activeDataset.previewRows || {})
                  } 
                  columns={activeDataset.columnNames || []} 
                />
              </div>

              {/* Simple, Automated Metric Summary Metrics Cards */}
              {(() => {
                const rows = Array.isArray(activeDataset.previewRows) 
                  ? activeDataset.previewRows 
                  : typeof activeDataset.previewRows === "string"
                    ? JSON.parse(activeDataset.previewRows)
                    : Object.values(activeDataset.previewRows || {});

                const numericCols = (activeDataset.columnNames || []).filter((col: string) => 
                  rows.some((r: any) => typeof r[col] === "number" && !isNaN(r[col]))
                );

                if (numericCols.length === 0) return null;

                const targetKey = numericCols[0];
                const validValues = rows.map((r: any) => Number(r[targetKey])).filter((v: number) => !isNaN(v));

                if (validValues.length === 0) return null;

                const max = Math.max(...validValues);
                const min = Math.min(...validValues);
                const avg = validValues.reduce((sum: number, val: number) => sum + val, 0) / validValues.length;

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 shadow-sm">
                      <p className="text-[11px] uppercase font-bold text-slate-400">Peak Maximum ({targetKey})</p>
                      <p className="text-2xl font-bold text-white mt-1">{max.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 shadow-sm">
                      <p className="text-[11px] uppercase font-bold text-slate-400">Floor Minimum ({targetKey})</p>
                      <p className="text-2xl font-bold text-white mt-1">{min.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 shadow-sm">
                      <p className="text-[11px] uppercase font-bold text-slate-400">Calculated Average</p>
                      <p className="text-2xl font-bold text-blue-400 mt-1">{avg.toFixed(2)}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="border border-dashed border-zinc-300 rounded-xl bg-zinc-50/30 h-80 flex flex-col items-center justify-center text-zinc-400 text-sm p-6 text-center">
              <BarChart3 className="w-12 h-12 text-zinc-300 mb-3" />
              <p className="font-semibold text-zinc-500">Visualization Studio Empty</p>
              <p className="text-xs max-w-sm mt-1">Select a database tracked asset from the tracking array to configure graphs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}