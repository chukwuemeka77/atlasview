import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const connectWallet = async () => {
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "YOUR_INFURA_ID",
        },
      },
    },
  });

  const provider = await web3Modal.connect();
  return provider;
};
