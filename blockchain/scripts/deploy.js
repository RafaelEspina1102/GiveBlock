const hre = require("hardhat");

async function main() {

    const GiveBlock = await hre.ethers.getContractFactory("GiveBlock");

    const giveBlock = await GiveBlock.deploy();

    await giveBlock.waitForDeployment();

    console.log("GiveBlock deployed to:", await giveBlock.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
