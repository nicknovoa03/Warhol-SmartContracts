import { ethers } from "hardhat";

async function main() {

  const SmartContract = await ethers.getContractFactory("Collection9022");
  const NFT = await SmartContract.deploy("");

  await NFT.deployed();

  console.log(`Inheritance Art NFT deployed to ${NFT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



