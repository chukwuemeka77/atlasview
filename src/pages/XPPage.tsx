import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

interface XPData {
  totalXP: number;
  level: number;
  progress: number; // 0 - 100%
}

const XPPage: React.FC = () => {
  const { userId } = useAppContext();
  const [xpData, setXPData] = useState<XPData>({
    totalXP: 0,
    level: 1,
    progress: 0,
  });

  const fetchXPData = async () => {
    try {
      // Replace with real backend API
      // const res = await axios.get(`/api/xp/${userId}`);
      // setXPData(res.data);

      // Mock data for now
      setXPData({ totalXP: 1200, level: 5, progress: 65 });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchXPData();
  }, [userId]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">XP Dashboard</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Total XP</p>
            <p className="text-2xl font-bold">{xpData.totalXP}</p>
          </div>
          <div>
            <p className="font-medium">Level</p>
            <p className="text-2xl font-bold">{xpData.level}</p>
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Progress to next level</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${xpData.progress}%` }}
            />
          </div>
          <p className="text-sm mt-1">{xpData.progress}%</p>
        </div>

        <div>
          <p className="font-medium mb-2">XP Actions</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Complete swaps</li>
            <li>Bridge tokens</li>
            <li>Participate in liquidity pools</li>
            <li>Refer friends</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default XPPage;
