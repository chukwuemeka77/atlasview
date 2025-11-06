// src/context/XPContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";

interface XPContextType {
  xp: number;
  addXP: (amount: number) => void;
}

interface XPProviderProps {
  children: ReactNode;
}

const XPContext = createContext<XPContextType | undefined>(undefined);

export const XPProvider: React.FC<XPProviderProps> = ({ children }) => {
  const [xp, setXP] = useState<number>(0);

  const addXP = (amount: number) => setXP((prev) => prev + amount);

  return (
    <XPContext.Provider value={{ xp, addXP }}>
      {children}
    </XPContext.Provider>
  );
};

export const useXPContext = () => {
  const context = useContext(XPContext);
  if (!context) throw new Error("useXPContext must be used within XPProvider");
  return context;
};
