import React, { useEffect, useState } from 'react'
import { NFT } from '../../../components'

const getTotal = obj => Object.values(obj).reduce((a, b) => a + b);

export default function CollectionDetails({ collection }) {
  const [nftList, setNftList] = useState()
  const [floorPrice, setFloorPrice] = useState(0)

  const fetchNFT = async (users) => {
    const res = await Promise.all(users?.map(async (user) => {
      const data = await fetch(`https://eth-rinkeby.alchemyapi.io/v2/demo/getNFTs/?owner=${user?.walletAddress}`);
      if (data.status === 200) {
        return (await data.json())?.ownedNfts
      }
    }))
    let nftData = [];
    res.forEach((element, i) => {
      nftData.push(...element)
    });
    let sum = 0;
    nftData = nftData.filter(item => { if (item?.metadata?.collection == collection?.name) { sum += parseFloat(item.metadata.price); return item } })
    setNftList(nftData?.sort(() => Math.random() - 0.5))
    setFloorPrice(sum);
  }
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(data => data && fetchNFT(data?.data)).catch(e => console.log(e))
  }, [])
  return (
    <>
      <div className="h-40 sm:h-48 w-full flex justify-center items-center">
        <img
          className="w-full h-full object-cover"
          src={
            collection?.bannerURL
          }
          alt="banner"
        />
      </div>
      <div className="px-4 w-full">
        <div className='w-full flex justify-center text-white'>
          <img
            className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-teal-800 -mt-16 sm:-mt-20"
            src={
              collection?.featureURL || collection?.logoURL
            }
            alt="profile image"
          />
        </div>
        <div className="text-center text-white">
          <div className="text-3xl sm:text-5xl font-bold mb-4">{collection?.name}</div>
        </div>
        <div className="text-center text-white">
          {/* <p className="text-base sm:text-lg mb-4">
            Created by{' '}
            <span className="text-teal-400">Game Changer</span>
          </p> */}
        </div>
        <div className="w-full flex justify-center text-white">
          <div className="flex flex-wrap justify-center gap-10 p-5 sm:px-10 border border-teal-900 rounded-xl mb-4">
            <div className="">
              <div className="text-3xl font-bold text-center">{nftList?.length ?? 0}</div>
              <div className="text-lg min-w-max text-center mt-1">Items</div>
            </div>
            <div className="">
              <div className="text-3xl font-bold text-center">
                1
              </div>
              <div className="text-lg min-w-max text-center mt-1">Owners</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-3xl font-bold text-center flex">
                <img
                  src="/assets/icons/eth-blue.svg"
                  alt="eth"
                  className="h-8"
                />
                {floorPrice}
              </div>
              <div className="text-lg min-w-max text-center mt-1">Floor Price</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-3xl font-bold text-center flex mx-auto">
                <img
                  src="/assets/icons/eth-blue.svg"
                  alt="eth"
                  className="h-8 mr-2"
                />
                {(Math.random() * 10).toFixed(2)}
              </div>
              <div className="text-lg min-w-max text-center mt-1">Volume Traded</div>
            </div>
          </div>
        </div>
        <div className="text-center text-white">
          <div className="text-lg sm:text-xl my-4 text-gray-300">{collection?.description}</div>
        </div>
      </div>

      <hr className='border border-teal-800 my-5' />

      {/* collection NFTs here */}
      <div className='p-5 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center items-stretch justify-evenly max-w-7xl mx-auto flex-wrap gap-12 lg:gap-y-16'>
        {nftList?.length > 0 && nftList.map((nft, i) => <NFT key={i + i} nft={nft} />)}
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { data } = await fetch(`${process.env.host}/api/collection?id=${params.collectionId}`).then(res => res.json())
  return {
    props: {
      collection: data[0]
    }
  }
}