import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

interface Treasury {
  name: string;
  balance: number;
}

interface BridgeHistory {
  _id: string;
  fromChain: string;
  toChain: string;
  token: string;
  amount: number;
  timestamp: string;
}

const BridgePage: React.FC = () => {
  const { userId } = useAppContext();
  const [treasuries, setTreasuries] = useState<Treasury[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [token, setToken] = useState<string>(""); // Added token field
  const [history, setHistory] = useState<BridgeHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTreasuries = async () => {
    try {
      const res = await axios.get("/api/treasuries");
      if (Array.isArray(res.data)) setTreasuries(res.data);
      else setTreasuries([]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistory = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(`/api/bridge/history/${userId}`);
      if (Array.isArray(res.data)) setHistory(res.data);
      else setHistory([]);
    } catch (err) {
      console.error("Failed to fetch bridge history", err);
    }
  };

  const handleBridge = async () => {
    if (!amount || !from || !to || !token) return alert("Complete all fields");
    setLoading(true);
    try {
      const res = await axios.post("/api/bridge/transfer", {
        userId,
        fromChain: from,
        toChain: to,
        token,
        amount,
      });
      alert(res.data.message || "Bridge successful");
      setAmount(0);
      fetchTreasuries();
      fetchHistory(); // refresh history after bridge
    } catch (err: any) {
      alert(err.response?.data?.message || "Bridge failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreasuries();
    fetchHistory();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bridge Tokens</h1>

      {/* Bridge form */}
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4 mb-10">
        <div>
          <label className="block mb-1 font-medium">From Chain</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">Select Chain</option>
            {treasuries.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} ({t.balance})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">To Chain</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">Select Chain</option>
            {treasuries.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} ({t.balance})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Token</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="e.g. ATLAS, USDT..."
          />
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
          disabled={loading}
          className={`w-full text-white py-2 rounded transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Bridge"}
        </button>
      </div>

      {/* Bridge History */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Bridge History</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No bridge history found.</p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">From</th>
                <th className="py-2">To</th>
                <th className="py-2">Token</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{h.fromChain}</td>
                  <td className="py-2">{h.toChain}</td>
                  <td className="py-2">{h.token}</td>
                  <td className="py-2">{h.amount}</td>
                  <td className="py-2">
                    {new Date(h.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BridgePage;
