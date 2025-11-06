// src/components/WalletSelector.tsx
import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { connectExternalWallet } from "../utils/web3";
import api from "../utils/api";

export default function WalletSelector() {
  const { wallet, setWallet } = useContext(WalletContext);

  const handleConnectExternal = async () => {
    try {
      const conn = await connectExternalWallet();
      setWallet({ provider: conn.provider, signer: conn.signer, address: conn.address, chain: String(conn.chainId), inApp: false });
    } catch (err) {
      console.error("connect ext wallet err", err);
      alert("Failed to connect wallet.");
    }
  };

  const handleUseInApp = async () => {
    try {
      // create or fetch in-app wallets for this user via backend
      const res = await api.post("/wallet/create", { userId: "user123" });
      // expected: { addresses: { BSC: '0x..', ETH: '0x..' }, sessionToken: '...' }
      setWallet({ inApp: true, address: res.data.addresses?.BSC || "", chain: "BSC", inAppMeta: { sessionToken: res.data.sessionToken } });
    } catch (err) {
      console.error(err);
      alert("Could not create in-app wallet.");
    }
  };

  if (wallet?.address) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-xs text-gray-300">Connected</div>
        <div className="font-mono text-sm">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</div>
        <button className="px-3 py-1 bg-gray-800 rounded text-sm" onClick={() => setWallet(null)}>Disconnect</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleConnectExternal} className="px-3 py-1 bg-[#111827] border border-gray-700 rounded text-sm">Connect Wallet</button>
      <button onClick={handleUseInApp} className="px-3 py-1 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white rounded text-sm">Use In-App</button>
    </div>
  );
}
