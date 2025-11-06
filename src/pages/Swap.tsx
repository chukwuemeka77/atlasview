import React from "react";
import SwapForm from "../components/SwapForm";
export default function Swap() {
  const userId = "user123";
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Swap</h1>
      <SwapForm userId={userId} />
    </div>
  );
}
