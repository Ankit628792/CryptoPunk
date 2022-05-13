import React, { useEffect, useState } from 'react'
import { NFTs } from '../../components'

function assets() {
    const [nftList, setNftList] = useState([])
    const fetchNFT = async (users) => {
        const res = await Promise.all(users?.map(async (user) => {
            const data = await fetch(`https://eth-rinkeby.alchemyapi.io/v2/demo/getNFTs/?owner=${user?.walletAddress}`);
            if (data.status === 200) {
                return (await data.json())?.ownedNfts
            }
        }))
        let nftData = [];
        res.forEach(element => {
            nftData.push(...element)
        });
        setNftList(nftData?.sort(() => Math.random() - 0.5))
    }
    useEffect(() => {
        fetch('/api/user').then(res => res.json()).then(data => data && fetchNFT(data?.data)).catch(e => console.log(e))
    }, [])

    return (
        <>
            <NFTs nftList={nftList} />
        </>
    )
}

export default assets

// export async function getServerSideProps() {
//     const nft = await fetch(`${process.env.host}/api/nft?limit=100`).then(res => res.json())
//     return {
//         props: {
//             nftList: nft?.data
//         }
//     }
// }