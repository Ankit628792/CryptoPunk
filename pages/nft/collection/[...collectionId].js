import React from 'react'
import { NFT } from '../../../components'

export default function CollectionDetails(_id) {
  console.log(_id)
  return (
    <>
      <div className="h-40 sm:h-48 w-full flex justify-center items-center">
        <img
          className="w-full h-full object-cover"
          src={
            'https://cdn.sanity.io/images/lj6cax0s/production/63d42815a45e47238c34e41e33580e39b02182d4-1358x755.png'
          }
          alt="banner"
        />
      </div>
      <div className="px-4 w-full">
        <div className='w-full flex justify-center text-white'>
          <img
            className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-full border-2 border-teal-800 -mt-16 sm:-mt-20"
            src={
              'https://cdn.sanity.io/images/lj6cax0s/production/1b0a3ca7a6b3e875470391e04e454281abb00f97-281x280.jpg'
            }
            alt="profile image"
          />
        </div>
        <div className="text-center text-white">
          <div className="text-3xl sm:text-5xl font-bold mb-4">Bored Ape Club</div>
        </div>
        <div className="text-center text-white">
          <p className="text-base sm:text-lg mb-4">
            Created by{' '}
            <span className="text-teal-400">Game Changer</span>
          </p>
        </div>
        <div className="w-full flex justify-center text-white">
          <div className="flex flex-wrap justify-center gap-10 p-5 sm:px-10 border border-teal-900 rounded-xl mb-4">
            <div className="">
              <div className="text-3xl font-bold text-center">0</div>
              <div className="text-lg min-w-max text-center mt-1">Items</div>
            </div>
            <div className="">
              <div className="text-3xl font-bold text-center">
                1
              </div>
              <div className="text-lg min-w-max text-center mt-1">Owners</div>
            </div>
            <div className="">
              <div className="text-3xl font-bold text-center flex">
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className="h-6 mr-2"
                />
                99
              </div>
              <div className="text-lg min-w-max text-center mt-1">Floor Price</div>
            </div>
            <div className="">
              <div className="text-3xl font-bold text-center flex">
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className="h-6 mr-2"
                />
                124.5K
              </div>
              <div className="text-lg min-w-max text-center mt-1">Volume Traded</div>
            </div>
          </div>
        </div>
        <div className="text-center text-white">
          <div className="text-lg sm:text-xl my-4 text-gray-300">Bexport default ored Ape Club is a Details of thousands of Ape NFTs</div>
        </div>
      </div>

      <hr className='border border-teal-800 my-5' />

      {/* collection NFTs here */}
      <div className='p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center items-stretch justify-evenly max-w-7xl mx-auto flex-wrap gap-12 lg:gap-y-16'>
        <NFT />
        <NFT />
        <NFT />
        <NFT />
        <NFT />
        <NFT />
        <NFT />
        <NFT />
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      _id: params.collectionId
    }
  }
}