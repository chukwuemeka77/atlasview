// src/components/SwapInterface.tsx
import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/WalletContext";
import TokenSelector from "./TokenSelector";
import { swapTokens } from "../utils/api";
import { XPContext } from "../context/XPContext";

const SAMPLE_TOKENS = [
  { symbol: "USDT", address: "USDT" },
  { symbol: "WBNB", address: "WBNB" },
  { symbol: "WETH", address: "WETH" },
];

export default function SwapInterface({ userId }: { userId: string }) {
  const { wallet } = useContext(WalletContext);
  const { setXP } = useContext(XPContext);
  const [fromToken, setFromToken] = useState(SAMPLE_TOKENS[0].address);
  const [toToken, setToToken] = useState(SAMPLE_TOKENS[1].address);
  const [amount, setAmount] = useState<number | "">("");
  const [quote, setQuote] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // You can fetch a price quote from backend if available
    setQuote(null);
  }, [fromToken, toToken, amount]);

  const handleSwap = async () => {
    if (!wallet) return alert("Connect or create a wallet first.");
    if (!amount || Number(amount) <= 0) return alert("Enter amount");

    setLoading(true);
    try {
      const payload = {
        userId,
        chain: wallet.chain || process.env.REACT_APP_DEFAULT_CHAIN || "BSC",
        fromToken,
        toToken,
        amount: Number(amount),
      };
      const res = await swapTokens(payload);
      // res expected: { success: true, transaction, xpEarned }
      if (res.data.xpEarned) setXP((xp) => xp + Number(res.data.xpEarned));
      alert("Swap submitted. Tx recorded on backend.");
    } catch (err: any) {
      console.error("swap err", err);
      alert(err?.response?.data?.error || err.message || "Swap failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-[#071026] p-6 rounded shadow-lg text-white">
      <div className="text-sm text-gray-300 mb-4">Swap</div>

      <div className="space-y-3">
        <div>
          <div className="text-xs text-gray-400 mb-1">From</div>
          <div className="flex gap-2">
            <input className="flex-1 p-2 rounded bg-[#081426] text-white" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value === "" ? "" : Number(e.target.value))} />
            <div className="w-44"><TokenSelector value={fromToken} onChange={setFromToken} tokens={SAMPLE_TOKENS} /></div>
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-400 mb-1">To</div>
          <div className="flex gap-2">
            <input className="flex-1 p-2 rounded bg-[#081426] text-gray-400" value={quote !== null ? String(quote) : ""} readOnly placeholder="Estimated" />
            <div className="w-44"><TokenSelector value={toToken} onChange={setToToken} tokens={SAMPLE_TOKENS} /></div>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <div>Markup fee: <span className="text-white">1%</span></div>
          <div>XP: <span className="text-white">{amount ? Math.max(1, Number(amount) * 0.1) : 0}</span></div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSwap} disabled={loading} className="px-5 py-2 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded font-medium">
            {loading ? "Processing..." : "Swap"}
          </button>
        </div>
      </div>
    </div>
  );
}
