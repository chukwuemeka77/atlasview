import React, { createContext, useContext, useState, ReactNode } from "react";

interface Wallet {
  connected: boolean;
  address?: string;
  chainId?: string;
  balance?: number;
  token?: string;
}

interface WalletContextProps {
  wallet: Wallet | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>({ connected: false });

  const connectWallet = async () => {
    try {
      if (!(window as any).keplr) throw new Error("Keplr extension not found");
      const keplr = (window as any).keplr;
      await keplr.enable("atlas-chain"); // placeholder for Atlas chain
      const offlineSigner = keplr.getOfflineSigner("atlas-chain");
      const accounts = await offlineSigner.getAccounts();
      setWallet({
        connected: true,
        address: accounts[0].address,
        chainId: "ATLAS-CHAIN",
        balance: 0, // fetch real balance from backend/API later
        token: "ATLAS",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to connect Keplr wallet");
    }
  };

  const disconnectWallet = () => setWallet({ connected: false });

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
};
