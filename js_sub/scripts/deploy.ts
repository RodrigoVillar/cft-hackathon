// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const Escrow = await ethers.getContractFactory("Escrow");
  // const escrow = await Escrow.deploy('0xd0392fFa6702E435aAE9916103482e2414FaDc39');//relay address

  // await escrow.deployed();

  // console.log("Escrow deployed to:", escrow.address);

  const Franchise = await ethers.getContractFactory("Franchise");
  const franchise = await Franchise.deploy('0xd0392fFa6702E435aAE9916103482e2414FaDc39'); //addreess

  await franchise.deployed();

  console.log("Franchise deployed to:", franchise.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
