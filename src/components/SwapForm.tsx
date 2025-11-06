import React, { useContext, useState } from "react";
import { swapTokens } from "../api";
import { WalletContext } from "../context/WalletContext";

export default function SwapForm({ userId }: { userId: string }) {
  const { wallet } = useContext(WalletContext);
  const [fromToken, setFromToken] = useState("USDT");
  const [toToken, setToToken] = useState("WBNB");
  const [amount, setAmount] = useState<number | "">("");

  const handleSwap = async () => {
    if (!wallet) return alert("Connect wallet or use in-app wallet.");
    const payload = {
      userId,
      chain: wallet.chain || process.env.REACT_APP_DEFAULT_CHAIN,
      fromToken,
      toToken,
      amount: Number(amount)
    };
    const res = await swapTokens(payload);
    console.log("swapped", res.data);
    alert("Swap submitted — check backend tx log.");
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-3">
      <div className="flex space-x-2">
        <input className="flex-1" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" type="number"/>
        <select value={fromToken} onChange={(e)=>setFromToken(e.target.value)}><option>USDT</option><option>WBNB</option></select>
        <select value={toToken} onChange={(e)=>setToToken(e.target.value)}><option>WBNB</option><option>USDT</option></select>
      </div>
      <div className="flex justify-end">
        <button onClick={handleSwap} className="bg-primary text-white px-4 py-2 rounded">Swap</button>
      </div>
    </div>
  );
}
