import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/VotingSystem.sol/VotingSystem.json";

// ✅ Replace with your actual contract address
export const CONTRACT_ADDRESS = "0xf9FD8850A9Fe7F2c116126c40b4ae7219873f929";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask is not installed");

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
};
