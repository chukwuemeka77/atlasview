import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { connectExternalWallet } from "../utils/web3";

export default function WalletSelector() {
  const { wallet, setWallet } = useContext(WalletContext);

  const handleConnect = async () => {
    const conn = await connectExternalWallet();
    setWallet({ provider: conn.provider, signer: conn.signer, address: conn.address, chain: conn.chainId, inApp: false });
  };

  const handleUseInApp = async () => {
    // call backend to create/load in-app wallets (backend returns addresses)
    // placeholder: you will implement createInAppWallets endpoint
    const res = await fetch(`${process.env.REACT_APP_API_URL}/wallet/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user123" })
    });
    const json = await res.json();
    // json should include addresses per chain and a server-signed token/session to sign actions
    setWallet({ address: json.addresses?.BSC, chain: process.env.REACT_APP_DEFAULT_CHAIN || "BSC", inApp: true });
  };

  return (
    <div className="flex items-center space-x-3">
      {wallet?.address ? (
        <div className="text-sm">Connected: <span className="font-mono">{wallet.address.slice(0,6)}...{wallet.address.slice(-4)}</span></div>
      ) : (
        <>
          <button onClick={handleConnect} className="px-4 py-2 bg-primary text-white rounded">Connect External</button>
          <button onClick={handleUseInApp} className="px-4 py-2 bg-secondary text-white rounded">Use In-App Wallet</button>
        </>
      )}
    </div>
  );
}
