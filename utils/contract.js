import Transactions from './Transactions.json'
import NFTs from './NFTs.json'

export const contractAddress = process.env.contractAddress
export const contractABI = Transactions.abi

export const nftContractAddress = process.env.nftContractAddress
export const nftContractABI = NFTs.abi

export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`

import { ethers } from 'ethers'

export const createEthereumContract = () => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    return transactionContract;
}

export const sendTransaction = async (formData, setIsLoading) => {
    try {
        const { ethereum } = window
        setIsLoading(true)
        const transactionContract = createEthereumContract()
        const { addressTo, amount, message, keyword, currentAccount } = formData;
        if (!currentAccount) return
        const parsedAmount = ethers.utils.parseEther(amount)
        console.log(formData)
        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208', // 21000 GWEI -> 0.000021 ETH
                value: parsedAmount._hex
            }]
        })

        const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)

        await transactionHash.wait()

        setIsLoading(false)

        const transactionCount = await transactionContract.getTransactionCount()
        return { success: true, count: transactionCount.toNumber() }
    } catch (error) {
        console.log(error);

        throw new Error("No ethereum object");
    }
}


const getAllTransactions = async () => {
    try {
        const transactionsContract = createEthereumContract();
        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));


        return structuredTransactions;

    } catch (error) {
        console.log(error);
    }
};

export const checkIfTransactionsExists = async () => {
    try {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();
        window.localStorage.setItem("transactionCount", currentTransactionCount);
        const data = await getAllTransactions()
        return data
    } catch (error) {
        console.log(error);

        throw new Error("No ethereum object");
    }
};