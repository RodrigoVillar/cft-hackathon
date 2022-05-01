async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Franchise = await ethers.getContractFactory("Franchise");
  const franchiseContract = await Franchise.deploy('0x1a08594081B5AED71de0c203AC188311a83e7aD7');

  console.log("Franchise address:" + franchiseContract.address);
  saveDAppFiles(franchiseContract);
}

// Store metadata for the dApp
function saveDAppFiles(contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../subnet1frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  // Store the contract address
  const addressFileName = contractsDir + "/franchise-address.json";
  fs.writeFileSync(
    addressFileName,
    JSON.stringify({ Contract: contract.address }, undefined, 2)
  );
  console.log("Stored address in ", addressFileName);

  // Store the contract artifact (including the ABI)
  const ContractArtifact = artifacts.readArtifactSync("Franchise");
  const artifactFileName = contractsDir + "/Franchise.json";
  fs.writeFileSync(
    artifactFileName,
    JSON.stringify(ContractArtifact, null, 2)
  );
  console.log("Stored artifact in ", artifactFileName);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });