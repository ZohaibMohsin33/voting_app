require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const sepoliaRpcUrl = process.env.SEPOLIA_API_URL;
const privateKey = process.env.PRIVATE_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

    console.log("hardhat.config.js - SEPOLIA_RPC_URL:", sepoliaRpcUrl); // ***ADD THIS***
    console.log("hardhat.config.js - PRIVATE_KEY:", privateKey);
    console.log("hardhat.config.js - ETHERSCAN_API_KEY:", etherscanApiKey);


module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: sepoliaRpcUrl, // Use the variable from .env
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: etherscanApiKey,
    },
  },
};