import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const LiquidityPage: React.FC = () => {
  const { refreshData } = useAppContext();
  const [chain, setChain] = useState<string>("BSC");
  const [tokenA, setTokenA] = useState<string>("BNB");
  const [tokenB, setTokenB] = useState<string>("BUSD");
  const [amountA, setAmountA] = useState<number>(0);
  const [amountB, setAmountB] = useState<number>(0);

  const provideLiquidity = async () => {
    try {
      const res = await axios.post("/api/liquidity", { userId: "USER_ID_HERE", chain, tokenA, tokenB, amountA, amountB });
      alert(`Liquidity added! XP earned: ${res.data.xpEarned}`);
      await refreshData();
    } catch (err) {
      console.error(err);
      alert("Failed to provide liquidity");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Provide Liquidity</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Chain</label>
          <input className="w-full p-2 border rounded" value={chain} onChange={(e) => setChain(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium">Token A</label>
          <input className="w-full p-2 border rounded" value={tokenA} onChange={(e) => setTokenA(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium">Token B</label>
          <input className="w-full p-2 border rounded" value={tokenB} onChange={(e) => setTokenB(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Amount A</label>
            <input type="number" className="w-full p-2 border rounded" value={amountA} onChange={(e) => setAmountA(Number(e.target.value))} />
          </div>
          <div>
            <label className="block font-medium">Amount B</label>
            <input type="number" className="w-full p-2 border rounded" value={amountB} onChange={(e) => setAmountB(Number(e.target.value))} />
          </div>
        </div>
        <button
          onClick={provideLiquidity}
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
        >
          Add Liquidity
        </button>
      </div>
    </div>
  );
};

export default LiquidityPage;
