import React from 'react'
import { SingleNFT } from '../../components'

export default function NFTDetails({ nft, transactions }) {
    return (
        <>
            <SingleNFT nft={nft} transactions={transactions} />
        </>
    )
}

export async function getServerSideProps({ params, query }) {
    const data = await fetch(`https://deep-index.moralis.io/api/v2/nft/${query?.nftId?.[0]}/${query?.tokenId}?chain=rinkeby&format=decimal`, { headers: { 'Accept': 'application/json', 'X-API-Key': process.env.moralisApiKey } }).then(res => res.json()).catch(e => console.log(e))
    const {result} = await fetch(`https://deep-index.moralis.io/api/v2/nft/${query?.nftId?.[0]}/${query?.tokenId}/transfers?chain=rinkeby&format=decimal&limit=100`, { headers: { 'Accept': 'application/json', 'X-API-Key': process.env.moralisApiKey } }).then(res => res.json()).catch(e => console.log(e))
    return {
        props: {
            nft: data,
            transactions: result
        }
    }
}