import React, { useEffect, useState } from 'react'
import { NFTs } from '../../components'

function assets() {
    const [nftList, setNftList] = useState([])
    const fetchNFT = async (users) => {
        if (!users?.length) return;
        const res = await Promise.all(users?.map(async (user) => {
            try {
                const data = await fetch(`https://eth-rinkeby.alchemyapi.io/nft/v2/syCSoIu0Ws7qn2NZry_ztgAEo8NYgYbw/getNFTs/?owner=${user?.walletaddress}`);
                if (data.status === 200) {
                    return (await data.json())?.ownedNfts
                }
            } catch (error) {
                console.log(error)
                return null
            }
        }))
        if (res) {
            let nftData = [];
            res.forEach(element => {
                nftData.push(...element)
            });
            setNftList(nftData?.sort(() => Math.random() - 0.5))
        }
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
