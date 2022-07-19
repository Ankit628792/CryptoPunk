
const main = async () => {
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  const transactionsContract = await transactionsFactory.deploy();

  await transactionsContract.deployed();
  console.log("Transaction deployed to:", transactionsContract.address);

  const nftFactory = await hre.ethers.getContractFactory("NFTs")

  const nftContract = await nftFactory.deploy()
  await nftContract.deployed()
  console.log("NFT deployed to address:", nftContract.address)

  // Start deployment, returning a promise that resolves to a contract object
  // const myNFT = await MyNFT.deploy()
  // await myNFT.deployed()
  // console.log("MYNFT deployed to address:", myNFT.address)

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

runMain();