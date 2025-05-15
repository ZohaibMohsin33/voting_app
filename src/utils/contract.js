import { ethers } from "ethers";
import VotingSystem from "../../artifacts/contracts/VotingSystem.sol/VotingSystem.json";

const contractAddress = "0xd8f516CD2d259450B6f9fF8B9c740D9CDd8A6C31";

export const getContract = async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, VotingSystem.abi, signer);
  } else {
    console.error("Ethereum object not found");
  }
};
