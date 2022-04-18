import { ethers } from "ethers";
import { nftContractABI, nftContractAddress } from "./contract";

export const createNFTContract = () => {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.speedyNode
    )
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftContractAddress, nftContractABI, signer)

    return nftContract;
}

export const mintNFT = async (metadataUrl) => {
    try {
        const contract = createNFTContract()
        const response = await contract.functions.mint(metadataUrl)
        const tokenId = response.nonce;
        return `NFT successfully minted. \nContract address - ${nftContractAddress} \nToken Id - ${tokenId} \nHash - ${response.hash}`
    } catch (error) {
        return error
    }
}