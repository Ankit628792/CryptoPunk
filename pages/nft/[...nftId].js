import React from 'react'
import { SingleNFT } from '../../components'

export default function NFTDetails({ nft }) {
    return (
        <>
            <SingleNFT nft={nft} />
        </>
    )
}

export async function getServerSideProps({ params }) {
    const { data } = await fetch(`${process.env.host}/api/nft?id=${params?.nftId}`).then(res => res.json())
    return {
        props: {
            nft: data[0]
        }
    }
}