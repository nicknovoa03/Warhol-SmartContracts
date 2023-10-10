const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Contract', function () {
  let contract;
  let iAI;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Deploy the ERC20 token contract (iAI) if necessary
    const Token = await ethers.getContractFactory('TestToken');
    iAI = await Token.deploy();
    await iAI.deployed();

    const Contract = await ethers.getContractFactory('Collection9022');
    contract = await Contract.deploy(iAI.address);
    await contract.deployed();

    // Get the accounts
    [owner, addr1] = await ethers.getSigners();
  });

  it('should mint NFTs and update the amount minted for the caller', async function () {
    // Set the necessary parameters
    const numberOfTokens = 2;
    const maxPassTxn = 5;
    const price = 100; // Set the price per token

    // Approve token transfer from msg.sender to the contract
    await iAI.connect(addr1).approve(contract.address, price * numberOfTokens);

    // Get the initial amount minted for the caller (addr1)
    const initialAmountMinted = await contract.getAmountMinted(addr1.address);

    // Mint NFTs
    await contract.connect(addr1).mintNFT(numberOfTokens, { value: ethers.utils.parseEther('0.1') });

    // Get the updated amount minted for the caller (addr1)
    const updatedAmountMinted = await contract.getAmountMinted(addr1.address);

    // Check the amount minted
    expect(updatedAmountMinted).to.equal(initialAmountMinted + numberOfTokens);
  });

  it('should revert when exceeding the max amount per wallet', async function () {
    // Set the necessary parameters
    let numberOfTokens = 6; // Set a value greater than maxPassTxn

    // Attempt to mint NFTs
    await contract.connect(addr1).mintNFT(numberOfTokens);
    await expect(contract.connect(addr1).mintNFT(numberOfTokens)).to.be.revertedWith('Exceeds max amount per wallet');
  });

  // Add more test cases for other scenarios and requirements
});
