// src/context/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { WalletProvider } from "./WalletContext";
import { XPProvider } from "./XPContext";

interface AppContextType {
  theme: string;
  setTheme: (theme: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <AppContext.Provider value={{ theme, setTheme, isSidebarOpen, toggleSidebar }}>
      {/* 👇 Wrap nested contexts here */}
      <WalletProvider>
        <XPProvider>{children}</XPProvider>
      </WalletProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
