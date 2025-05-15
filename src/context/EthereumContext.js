import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const EthereumContext = createContext();

export const useEthereum = () => useContext(EthereumContext);

export const EthereumProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <EthereumContext.Provider value={{ account, connectWallet }}>
      {children}
    </EthereumContext.Provider>
  );
};
