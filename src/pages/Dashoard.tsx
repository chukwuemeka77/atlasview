import React from "react";
import WalletSelector from "../components/WalletSelector";
import XPDashboard from "../components/XPDashboard";

export default function Dashboard() {
  const userId = "user123";
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-4">
        <WalletSelector />
        <div className="p-4 bg-white rounded shadow">Main dashboard / balances (connect backend)</div>
      </div>
      <div>
        <XPDashboard userId={userId} />
      </div>
    </div>
  );
}
