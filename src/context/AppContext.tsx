import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Wallet {
  address: string;
  connected: boolean;
}

interface WalletContextProps {
  wallet: Wallet | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const connectWallet = async () => {
    try {
      if (!(window as any).keplr) {
        alert("Keplr wallet not detected!");
        return;
      }

      // Request Keplr to connect
      await (window as any).keplr.enable("atlas-chain"); // replace with your chain ID
      const offlineSigner = (window as any).getOfflineSigner("atlas-chain");
      const accounts = await offlineSigner.getAccounts();

      if (accounts.length > 0) {
        setWallet({ address: accounts[0].address, connected: true });
        console.log("Wallet connected:", accounts[0].address);
      }
    } catch (err) {
      console.error("Keplr connection error:", err);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
  };

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
