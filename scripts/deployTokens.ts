import { ethers } from "hardhat";

async function main() {

  const TestToken = await ethers.getContractFactory("TestToken");
  console.log("Deploying...")
  const testToken = await TestToken.deploy();

  await testToken.deployed();

  console.log(`Test token deployed to ${testToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



