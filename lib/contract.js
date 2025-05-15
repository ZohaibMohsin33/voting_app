import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/VotingSystem.sol/VotingSystem.json";

// ✅ Replace with your actual contract address
export const CONTRACT_ADDRESS = "0xd8f516CD2d259450B6f9fF8B9c740D9CDd8A6C31";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask is not installed");

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
};
