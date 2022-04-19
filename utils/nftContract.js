import { ethers } from "ethers";
import NFTs from './NFTs.json'

export const nftContractAddress = process.env.nftContractAddress
export const nftContractABI = NFTs.abi

export const createNFTContract = () => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftContractAddress, nftContractABI, signer)

    return nftContract;
}

export const mintNFT = async (metadataUrl) => {
    try {
        const contract = createNFTContract()
        const response = await contract.functions.mint(metadataUrl)
        const tokenId = response.nonce;
        return `NFT successfully minted. \nContract address - ${nftContractAddress} \nHash - ${response.hash}`
    } catch (error) {
        return error
    }
}