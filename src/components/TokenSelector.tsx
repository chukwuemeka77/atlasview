// src/components/TokenSelector.tsx
import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  tokens?: { symbol: string; address: string }[];
};

export default function TokenSelector({ value, onChange, tokens = [] }: Props) {
  return (
    <select className="p-2 bg-[#0b1220] text-white rounded w-full" value={value} onChange={(e) => onChange(e.target.value)}>
      {tokens.map((t) => <option key={t.address} value={t.address}>{t.symbol}</option>)}
    </select>
  );
}
