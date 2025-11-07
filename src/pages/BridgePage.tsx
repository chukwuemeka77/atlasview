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
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTreasuries = async () => {
    try {
      const res = await axios.get("/api/treasuries");
      setTreasuries(res.data);
    } catch (err) {
      console.error("Failed to fetch treasuries:", err);
    }
  };

  const handleBridge = async () => {
    if (!amount || !from || !to)
      return alert("Please complete all fields before bridging.");
    if (from === to) return alert("You cannot bridge to the same treasury.");
    setLoading(true);
    try {
      const res = await axios.post("/api/bridge", { userId, from, to, amount });
      alert(res.data.message || "Bridge successful!");
      fetchTreasuries();
      setAmount(0);
      setFrom("");
      setTo("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Bridge failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreasuries();
  }, []);

  const selectedFrom = treasuries.find((t) => t.name === from);
  const selectedTo = treasuries.find((t) => t.name === to);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Bridge Tokens
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-100">
        {/* From Treasury */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            From Treasury
          </label>
          <select
            className="w-full border rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">Select Treasury</option>
            {treasuries.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} (Balance: {t.balance})
              </option>
            ))}
          </select>
          {selectedFrom && (
            <p className="text-xs text-gray-500 mt-1">
              Balance: {selectedFrom.balance}
            </p>
          )}
        </div>

        {/* To Treasury */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            To Treasury
          </label>
          <select
            className="w-full border rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">Select Treasury</option>
            {treasuries.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} (Balance: {t.balance})
              </option>
            ))}
          </select>
          {selectedTo && (
            <p className="text-xs text-gray-500 mt-1">
              Balance: {selectedTo.balance}
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Amount
          </label>
          <input
            type="number"
            min="0"
            className="w-full border rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount to bridge"
          />
        </div>

        {/* Bridge Button */}
        <button
          onClick={handleBridge}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition-colors duration-200 ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Processing..." : "Bridge"}
        </button>
      </div>
    </div>
  );
};

export default BridgePage;
