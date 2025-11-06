import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api" });

export const swapTokens = (payload: any) => API.post("/swap", payload);
export const bridgeTokens = (payload: any) => API.post("/bridge/transfer", payload);
export const provideLiquidity = (payload: any) => API.post("/liquidity", payload);
export const getXP = (userId: string) => API.get(`/xp/${userId}`);
export const createInAppWallets = (payload: any) => API.post("/wallet/create", payload);
export const getWalletBalances = (userId: string) => API.get(`/wallet/balances?userId=${userId}`);
