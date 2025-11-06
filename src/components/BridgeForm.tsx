import React, { useContext, useState } from "react";
import { bridgeTokens } from "../api";
import { WalletContext } from "../context/WalletContext";

export default function BridgeForm({ userId }: { userId: string }) {
  const { wallet } = useContext(WalletContext);
  const [fromChain, setFromChain] = useState("BSC");
  const [toChain, setToChain] = useState("Polygon");
  const [amount, setAmount] = useState<number | "">("");

  const handleBridge = async () => {
    if (!wallet) return alert("Connect wallet first.");
    const payload = { userId, fromChain, toChain, amount: Number(amount) };
    const res = await bridgeTokens(payload);
    console.log("bridge result", res.data);
    alert("Bridge executed (backend).");
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <select value={fromChain} onChange={(e)=>setFromChain(e.target.value)}><option>BSC</option><option>ETH</option><option>Polygon</option></select>
        <select value={toChain} onChange={(e)=>setToChain(e.target.value)}><option>Polygon</option><option>BSC</option><option>ETH</option></select>
      </div>
      <input value={amount} onChange={(e)=>setAmount(Number(e.target.value))} placeholder="Amount" type="number" className="w-full"/>
      <div className="flex justify-end">
        <button onClick={handleBridge} className="bg-primary text-white px-4 py-2 rounded">Bridge</button>
      </div>
    </div>
  );
}
