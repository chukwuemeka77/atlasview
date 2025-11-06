// src/pages/DashboardLayout.tsx
import React from "react";
import Navbar from "../components/Navbar";
import XPBar from "../components/XPBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050814] text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        <aside className="col-span-3">
          <div className="space-y-4">
            <XPBar />
            <div className="p-4 bg-[#071026] rounded">Treasury / Central Bank summary (backend needed)</div>
          </div>
        </aside>
        <main className="col-span-9">
          {children}
        </main>
      </div>
    </div>
  );
}
