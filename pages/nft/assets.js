import React from 'react'
import { NFTs } from '../../components'

function assets({ nftList }) {
    return (
        <>
            <NFTs nftList={nftList} />
        </>
    )
}

export default assets

export async function getServerSideProps() {
    const nft = await fetch(`${process.env.host}/api/nft?limit=100`).then(res => res.json())
    return {
        props: {
            nftList: nft?.data
        }
    }
}