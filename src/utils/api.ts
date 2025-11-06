// src/utils/api.ts
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_BASE, timeout: 30000 });

export const swapTokens = (payload: any) => api.post("/swap", payload);
export const bridgeTokens = (payload: any) => api.post("/bridge/transfer", payload);
export const provideLiquidity = (payload: any) => api.post("/liquidity", payload);
export const getXP = (userId: string) => api.get(`/xp/${userId}`);
export const createInAppWallets = (payload: any) => api.post("/wallet/create", payload);
export const getWalletBalances = (userId: string) => api.get(`/wallet/balances?userId=${userId}`);

export default api;
