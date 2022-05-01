import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    subnet_hub: {
      url: "http://127.0.0.1:9650/ext/bc/utoXpzE54TNPoyWCfqBk7oDUDTN9iib6SSZiCQJd4RemtwiyQ/rpc",
      chainId: 13213,
      accounts:
        ["1c433b0b77c68f93516abc120d9f793a2eda8132fd49c584f5cefbd8f86d898e", "56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027", "7490f265524907a89203a49c2985a82491762747a60cd4f37ef16d9063b2fe6f"],
    },
    subnet_a: {
      url: "http://127.0.0.1:9650/ext/bc/2m1gzw5eRaJYqNtmwvA6nJwXaXyKKwFHnNWdmVhbohrC44yRnN/rpc",
      chainId: 13213,
      accounts:
        ["1c433b0b77c68f93516abc120d9f793a2eda8132fd49c584f5cefbd8f86d898e", "56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027", "7490f265524907a89203a49c2985a82491762747a60cd4f37ef16d9063b2fe6f"],
    },
    subnet_b: {
      url: "http://127.0.0.1:9650/ext/bc/2ezM2mb9s5GpthZ9P9oqb5QcofNgu8hJr9EEZLxTCorKz9Skoq/rpc",
      chainId: 13213,
      accounts:
        ["1c433b0b77c68f93516abc120d9f793a2eda8132fd49c584f5cefbd8f86d898e", "56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027", "7490f265524907a89203a49c2985a82491762747a60cd4f37ef16d9063b2fe6f"],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
