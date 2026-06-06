"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import FeeChart from "@/components/FeeChart";

const MapComponent = dynamic(
  () => import("@/components/MapComponent"),
  { ssr: false }
);

export default function Home() {
  const [fees, setFees] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState("All");
  const [selectedFeeType, setSelectedFeeType] = useState("All");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://127.0.0.1:8000/api/fees")
        .then((res) => {
          setFees(res.data);
        })
        .catch((err) => {
          console.error("API call failed, falling back to local simulation.", err);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  /* FILTER LOGIC */
  const filteredFees = fees.filter((item) => {
    const bankMatch = selectedBank === "All" || item.bank === selectedBank;
    const feeTypeMatch = selectedFeeType === "All" || item.fee_type?.trim() === selectedFeeType;
    return bankMatch && feeTypeMatch;
  });

  /* REGIONAL AVERAGE */
  const regionalAverage =
    filteredFees.length > 0
      ? Math.round(
          filteredFees.reduce((sum, item) => sum + item.fee, 0) / filteredFees.length
        )
      : 0;

  /* DOWNLOAD */
  const downloadData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(filteredFees, null, 2));
    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "bank_fee_data.json";
    link.click();
  };

  return (
    <div className="flex h-screen bg-[#030712] text-[#f3f4f6] font-sans overflow-hidden">
      
      {/* MAIN STAGE (70% Width) */}
      <div className="w-[70%] h-full flex flex-col relative">
        <header className="absolute top-4 left-4 z-[1000] p-4 glass-panel rounded-xl shadow-lg border border-[#1f2937] pointer-events-auto">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              BANK FEE BENCHMARK MAP
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">
                LIVE TERMINAL
              </span>
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Real-time geospatial indexing of national payment rail transaction fees.
          </p>
        </header>
        
        <div className="flex-1 w-full h-full">
          <MapComponent fees={filteredFees} />
        </div>
      </div>

      {/* INTELLIGENCE SIDEBAR (30% Width) */}
      <div className="w-[30%] h-full bg-[#0b1117]/95 border-l border-[#1f2937] flex flex-col z-[1010]">
        
        {/* Scrollable Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          
          {/* SECTION A: Title & High-level Metric */}
          <div className="border-b border-[#1f2937] pb-5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[#38bdf8] text-xs font-semibold uppercase tracking-wider font-mono">
                  FINANCIAL INTELLIGENCE
                </h2>
                <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                  Real Rails Portal
                </h1>
              </div>
              <span className="text-[10px] font-mono bg-red-950/45 text-red-400 border border-red-900/50 px-2 py-0.5 rounded">
                SECURE
              </span>
            </div>

            {/* High-level Metric Card */}
            <div className="mt-5 p-4 rounded-xl glass-panel relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#38bdf8]/5 rounded-full blur-2xl transition-all group-hover:bg-[#38bdf8]/10"></div>
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                Regional Average Fee
              </p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-4xl font-extrabold tracking-tight text-[#38bdf8]">
                  ₹{regionalAverage}
                </span>
                <span className="text-xs font-mono text-gray-400 font-bold">
                  INR / TX
                </span>
              </div>
              <div className="mt-2.5 flex items-center space-x-1.5 text-xs text-gray-400 border-t border-[#1f2937]/50 pt-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping"></span>
                <span>Active Nodes Indexed: <strong className="text-white">{filteredFees.length}</strong></span>
              </div>
            </div>
          </div>

          {/* SECTION B: Why This Matters */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="text-[#38bdf8]">✦</span> Why This Matters
            </h3>
            <div className="p-4 rounded-xl bg-[#030712]/50 border border-[#1f2937]/80 text-xs text-gray-300 leading-relaxed">
              Geographic fee benchmarking exposes structural inefficiencies and regional cost disparities in payment rail access. Higher local node fees represent a drag on regional commerce and friction in core capital movement infrastructure, signaling local monopolies or routing bottlenecks.
            </div>
          </div>

          {/* SECTION C: Who Controls the Rail */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="text-[#818cf8]">✦</span> Who Controls the Rail
            </h3>
            <div className="p-4 rounded-xl bg-[#030712]/50 border border-[#1f2937]/80 text-xs text-gray-300 leading-relaxed">
              The underlying clearing networks (NEFT, RTGS, and IMPS) are governed by the <strong>Reserve Bank of India (RBI)</strong> and operated via the <strong>National Payments Corporation of India (NPCI)</strong>, while localized consumer pricing is set independently by commercial banking institutions.
            </div>
          </div>

          {/* SECTION D: Functional Filters & Tooltips */}
          <div className="space-y-4 pt-4 border-t border-[#1f2937]/50">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              Control Parameters
            </h3>

            {/* Bank Filter with CSS Tooltip */}
            <div className="space-y-2 relative">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-300 flex items-center gap-1.5">
                  Select Banking Institution
                  <div className="relative inline-block cursor-help group/info">
                    <span className="w-3.5 h-3.5 rounded-full bg-gray-800 text-[10px] text-gray-400 flex items-center justify-center hover:bg-gray-700 font-mono">
                      i
                    </span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2.5 bg-[#0b1117] border border-[#1f2937] text-[10px] text-gray-300 rounded shadow-xl opacity-0 pointer-events-none group-hover/info:opacity-100 transition-opacity duration-200 z-[2000] leading-snug">
                      Filter geographic nodes by specific commercial bank to map their unique fee infrastructure footprint.
                    </div>
                  </div>
                </label>
                {selectedBank !== "All" && (
                  <button 
                    onClick={() => setSelectedBank("All")}
                    className="text-[10px] font-mono text-[#38bdf8] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#030712] border border-[#1f2937] text-sm text-gray-200 cyan-glow focus:border-[#38bdf8]/60"
              >
                <option value="All">All Institutions (Global Index)</option>
                {[...new Set(fees.map((item) => item.bank))].map((bank, index) => (
                  <option key={index} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            {/* Fee Type Filter with CSS Tooltip */}
            <div className="space-y-2 relative">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-300 flex items-center gap-1.5">
                  Select Transaction Type
                  <div className="relative inline-block cursor-help group/info">
                    <span className="w-3.5 h-3.5 rounded-full bg-gray-800 text-[10px] text-gray-400 flex items-center justify-center hover:bg-gray-700 font-mono">
                      i
                    </span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2.5 bg-[#0b1117] border border-[#1f2937] text-[10px] text-gray-300 rounded shadow-xl opacity-0 pointer-events-none group-hover/info:opacity-100 transition-opacity duration-200 z-[2000] leading-snug">
                      Filter dataset by clearing protocol or access mechanism (e.g. ATM withdrawals, Wires, or interbank Transfers).
                    </div>
                  </div>
                </label>
                {selectedFeeType !== "All" && (
                  <button 
                    onClick={() => setSelectedFeeType("All")}
                    className="text-[10px] font-mono text-[#38bdf8] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <select
                value={selectedFeeType}
                onChange={(e) => setSelectedFeeType(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#030712] border border-[#1f2937] text-sm text-gray-200 cyan-glow focus:border-[#38bdf8]/60"
              >
                <option value="All">All Fee Protocols</option>
                {[...new Set(fees.filter((item) => item.fee_type).map((item) => item.fee_type.trim()))].map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section */}
          <div className="border-t border-[#1f2937]/50 pt-5">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
              Geographic Fee Comparison
            </h3>
            <div className="p-3 rounded-xl bg-[#030712]/40 border border-[#1f2937]/60">
              <FeeChart fees={filteredFees} />
            </div>
          </div>

          {/* Node Cards List */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              Endpoint Nodes ({filteredFees.length})
            </h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {filteredFees.map((item, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl border border-[#1f2937] bg-[#0b1117] hover:border-[#38bdf8]/40 transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.bank}</h4>
                      <p className="text-xs text-gray-400">{item.city} Node</p>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 font-bold">
                      ₹{item.fee}
                    </span>
                  </div>
                  <div className="mt-2.5 flex justify-between items-center text-[10px] font-mono border-t border-[#1f2937]/50 pt-2">
                    <span className="text-gray-400 uppercase">{item.fee_type}</span>
                    <span className={item.fee > item.regional_average ? "text-rose-400" : "text-emerald-400"}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
              {filteredFees.length === 0 && (
                <div className="text-center py-6 text-xs text-gray-500 font-mono">
                  NO ACTIVE NODES FILTERED
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION E: Download Sample Data button (Fixed at Bottom of Sidebar) */}
        <div className="p-6 border-t border-[#1f2937] bg-[#0b1117]/90 backdrop-blur-md">
          <button
            onClick={downloadData}
            disabled={filteredFees.length === 0}
            className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#030712] font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer active:scale-[0.98]"
          >
            <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>DOWNLOAD BENCHMARK DATA</span>
          </button>
        </div>

      </div>
    </div>
  );
}