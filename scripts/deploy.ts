import { ethers } from "hardhat";

async function main() {

  const ConvertLib = await ethers.getContractFactory("ConvertLib");
  const convertLib = await ConvertLib.deploy();

  await convertLib.deployed();

  const MetaCoin = await ethers.getContractFactory("MetaCoin", {
    libraries: {
      ConvertLib: convertLib.address,
    },
  });
  const metaCoin = await MetaCoin.deploy();

  let instance = await metaCoin.deployed();

  console.log(`MetaCoin  deployed to ${metaCoin.address}`);
  let accounts = await ethers.getSigners()
  console.log(`There are a total of ${accounts.length} accounts`)
  await instance.sendCoin(accounts[1].address, 10, {from: accounts[0].address})
  console.log(`Sent 10 coin from ${accounts[0].address} to ${accounts[1].address}`)
  await instance.sendCoin(accounts[2].address, 10, {from: accounts[0].address})
  console.log(`Sent 10 coin from ${accounts[1].address} to ${accounts[2].address}`)
  await instance.sendCoin(accounts[3].address, 10, {from: accounts[0].address})
  console.log(`Sent 10 coin from ${accounts[1].address} to ${accounts[3].address}`)
  await instance.sendCoin(accounts[4].address, 10, {from: accounts[0].address})
  console.log(`Sent 10 coin from ${accounts[1].address} to ${accounts[3].address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
