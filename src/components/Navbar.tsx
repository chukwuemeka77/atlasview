import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../context/WalletContext";

const Navbar: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              ATLAS
            </Link>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex space-x-6 font-medium">
            <Link
              to="/"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Wallet
            </Link>
            <Link
              to="/swap"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Swap
            </Link>
            <Link
              to="/liquidity"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Liquidity
            </Link>
            <Link
              to="/bridge"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Bridge
            </Link>
            <Link
              to="/xp"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              XP
            </Link>
          </div>

          {/* Wallet connection */}
          <div>
            {wallet?.connected ? (
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded font-medium text-sm">
                  Connected
                </span>
                <button
                  onClick={disconnectWallet}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
