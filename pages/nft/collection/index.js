import React, { useEffect } from 'react'
import { Collections } from '../../../components'
import { useMoralisWeb3Api } from 'react-moralis'
// import { useMoralisWeb3Api } from 'react-moralis'

function index({ collectionList }) {
    const { Web3API } = useMoralisWeb3Api()
    // @walletconnect/web3-provider
    // @web3auth/web3auth
    // magic-sdk
    // useEffect(() => {

    //     const fetchData = async () => {
    //         // const transactions = await Moralis.Web3API.account.getTransactions({ chain: "ropsten", limit: 100 });
    //         // const options = { token_address: '0x76C942765E2c444B583ab637a119Fe569Bc69410', adress: '0x744Ca456EDA82Ad69cC064ce6716F893675F7a49', chain: 'rinkeby', limit: 100 };
    //         // const transactions = await Moralis.Web3API.account.getNFTsForContract(options);

    //         const data1 = await Web3API.account.getNFTTransfers({ chain: 'rinkeby' });
    //         // const options = { q: "nft", chain: "bsc", filter: "name" };
    //         // const NFTs = await Web3API.token.searchNFTs(options);
    //         // console.log(NFTs);
    //     }
    //     fetchData()

    // }, [])

    return (
        <>
            <Collections collectionList={collectionList} />
        </>
    )
}

export default index

export async function getServerSideProps() {
    const collection = await fetch(`${process.env.host}/api/collection?limit=100`).then(res => res.json());
    return {
        props: {
            collectionList: collection?.data,
        }
    }
}