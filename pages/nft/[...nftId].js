import React from 'react'
import { SingleNFT } from '../../components'

export default function NFTDetails({_id}) {
    console.log(_id)
    return (
        <>
            <SingleNFT />
        </>
    )
}

export async function getServerSideProps({ params }) {
    return {
        props: {
            _id: params.nftId
        }
    }
}