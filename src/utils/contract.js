import { ethers } from "ethers";
import VotingSystem from "../../artifacts/contracts/VotingSystem.sol/VotingSystem.json";

const contractAddress = "0xf9FD8850A9Fe7F2c116126c40b4ae7219873f929";

export const getContract = async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, VotingSystem.abi, signer);
  } else {
    console.error("Ethereum object not found");
  }
};
