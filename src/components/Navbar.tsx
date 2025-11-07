import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../context/WalletContext";

const Navbar: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 tracking-wide"
            >
              ATLAS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 font-medium">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Wallet
            </Link>
            <Link to="/swap" className="hover:text-blue-600 transition-colors">
              Swap
            </Link>
            <Link
              to="/liquidity"
              className="hover:text-blue-600 transition-colors"
            >
              Liquidity
            </Link>
            <Link to="/bridge" className="hover:text-blue-600 transition-colors">
              Bridge
            </Link>
            <Link to="/xp" className="hover:text-blue-600 transition-colors">
              XP
            </Link>
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-3">
            {wallet?.connected ? (
              <>
                <span className="hidden sm:inline text-sm font-mono bg-gray-100 px-3 py-1 rounded-xl text-gray-700">
                  {wallet.address
                    ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
                    : "Connected"}
                </span>
                <span className="text-xs text-blue-600 font-semibold">
                  {wallet.chainId || "ATLAS"}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition-colors"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Connect Wallet
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-3 border-t border-gray-100">
            <Link
              to="/"
              className="block px-3 py-2 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Wallet
            </Link>
            <Link
              to="/swap"
              className="block px-3 py-2 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Swap
            </Link>
            <Link
              to="/liquidity"
              className="block px-3 py-2 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Liquidity
            </Link>
            <Link
              to="/bridge"
              className="block px-3 py-2 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Bridge
            </Link>
            <Link
              to="/xp"
              className="block px-3 py-2 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              XP
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

