import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

declare global {
  interface Window {
    keplr?: any;
    getOfflineSigner?: any;
  }
}

interface WalletInfo {
  address: string;
  balance: number;
}

const WalletPage: React.FC = () => {
  const { userId } = useAppContext();
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [connecting, setConnecting] = useState(false);

  // Connect Keplr wallet
  const connectKeplr = async () => {
    if (!window.keplr) return alert("Keplr extension not found!");
    try {
      setConnecting(true);
      await window.keplr.enable("atlas-chain"); // replace with real chainId later
      const offlineSigner = window.getOfflineSigner("atlas-chain");
      const accounts = await offlineSigner.getAccounts();
      const address = accounts[0].address;

      // Fetch balance from backend placeholder (replace with real API later)
      const balance = 1000; // temporary mock
      setWallet({ address, balance });

      setConnecting(false);
    } catch (err) {
      console.error(err);
      setConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => setWallet(null);

  useEffect(() => {
    // optional: auto-connect if already authorized
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Wallet</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
        {wallet ? (
          <>
            <div>
              <p className="font-medium">Address:</p>
              <p className="truncate">{wallet.address}</p>
            </div>

            <div>
              <p className="font-medium">Balance:</p>
              <p>{wallet.balance} ATLAS</p>
            </div>

            <button
              onClick={disconnectWallet}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200"
            >
              Disconnect
            </button>
          </>
        ) : (
          <button
            onClick={connectKeplr}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {connecting ? "Connecting..." : "Connect Keplr Wallet"}
          </button>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
