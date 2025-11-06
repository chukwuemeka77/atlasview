import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

interface Treasury {
  name: string;
  balance: number;
}

const BridgePage: React.FC = () => {
  const { userId } = useAppContext();
  const [treasuries, setTreasuries] = useState<Treasury[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const fetchTreasuries = async () => {
    try {
      const res = await axios.get("/api/treasuries");
      setTreasuries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBridge = async () => {
    if (!amount || !from || !to) return alert("Complete all fields");
    try {
      const res = await axios.post("/api/bridge", { userId, from, to, amount });
      alert(res.data.message);
      fetchTreasuries();
    } catch (err: any) {
      alert(err.response?.data?.message || "Bridge failed");
    }
  };

  useEffect(() => {
    fetchTreasuries();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bridge Tokens</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">From Treasury</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">Select Treasury</option>
            {treasuries.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} ({t.balance})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">To Treasury</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">Select Treasury</option>
            {treasuries.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} ({t.balance})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
        </div>

        <button
          onClick={handleBridge}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Bridge
        </button>
      </div>
    </div>
  );
};

export default BridgePage;
