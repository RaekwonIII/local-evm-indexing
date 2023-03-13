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

  await metaCoin.deployed();

  console.log(`MetaCoin  deployed to ${metaCoin.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
