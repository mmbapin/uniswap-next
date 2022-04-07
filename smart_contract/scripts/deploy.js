const main = async () => {
  const transactionFactory = await hre.ethers.getContractFactory('Transactions')
  const transactionContract = await transactionFactory.deploy()

  await transactionContract.deploy()

  console.log("Transaction Deploy To:", transactionContract.address);
}; (async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
})()