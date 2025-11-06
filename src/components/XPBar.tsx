// src/components/XPBar.tsx
import React, { useContext } from "react";
import { XPContext } from "../context/XPContext";

export default function XPBar() {
  const { xp } = useContext(XPContext);
  const cap = Math.max(1000, Math.ceil(xp / 100) * 100); // UX cap
  const pct = Math.min(100, Math.round((xp / cap) * 100));
  return (
    <div className="p-3 bg-[#0b0f1a] border border-gray-800 rounded">
      <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
        <div>XP</div>
        <div>{xp} / {cap}</div>
      </div>
      <div className="w-full bg-gray-900 h-2 rounded">
        <div className="h-2 rounded" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#7c3aed,#ec4899)" }} />
      </div>
    </div>
  );
}
