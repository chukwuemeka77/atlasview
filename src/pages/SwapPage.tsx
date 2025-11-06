import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";

const SwapPage: React.FC = () => {
  const { wallet } = useWallet();
  const [fromToken, setFromToken] = useState("ATOM");
  const [toToken, setToToken] = useState("ATLAS");
  const [amount, setAmount] = useState<number>(0);
  const [outputAmount, setOutputAmount] = useState<number>(0);

  const handleSwap = () => {
    if (!wallet?.connected) return alert("Connect your wallet first!");
    // Atlas chain swap integration placeholder
    setOutputAmount(amount * 0.95); // mock 5% fee
    alert(`Swapped ${amount} ${fromToken} → ${toToken}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Swap Tokens</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
        {/* From Token */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium">From</label>
          <input
            type="number"
            placeholder="Amount"
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <select
            className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
          >
            <option value="ATOM">ATOM</option>
            <option value="ATLAS">ATLAS</option>
          </select>
        </div>

        {/* To Token */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium">To</label>
          <input
            type="text"
            placeholder="Output amount"
            className="w-full px-4 py-2 border rounded-xl bg-gray-50 cursor-not-allowed"
            value={outputAmount}
            readOnly
          />
          <select
            className="w-full mt-2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
          >
            <option value="ATOM">ATOM</option>
            <option value="ATLAS">ATLAS</option>
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition duration-200"
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default SwapPage;
