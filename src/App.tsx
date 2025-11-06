import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Navbar from "./components/Navbar";
import WalletPage from "./pages/WalletPage";
import SwapPage from "./pages/SwapPage";
import LiquidityPage from "./pages/LiquidityPage";
import BridgePage from "./pages/BridgePage";
import XPPage from "./pages/XPPage";

const userId = "USER_ID_HERE"; // Replace with real auth later

const App: React.FC = () => {
  return (
    <AppProvider userId={userId}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<WalletPage />} />
              <Route path="/swap" element={<SwapPage />} />
              <Route path="/liquidity" element={<LiquidityPage />} />
              <Route path="/bridge" element={<BridgePage />} />
              <Route path="/xp" element={<XPPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
