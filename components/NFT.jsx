import React from 'react'
import Router from 'next/router'

function NFT({ nft }) {
    return (
        <div className='w-full max-w-[280px] md:max-w-xs lg:max-w-[280px] rounded-2xl h-full overflow-hidden group border-2 border-transparent hover:border-teal-900 hover:scale-105 transition-all duration-500 ease-out relative m-2' onClick={() => Router.push(`/nft/${nft?._id}`)}>
            <img className='w-full h-80 object-cover group-hover:rounded-3xl group-hover:scale-90 transition-all duration-300 ease-out' src={nft?.media} alt="" />
            <div className='w-full relative flex justify-between gap-x-10 px-5 pt-3'>
                <button className='absolute -top-8 left-1/2 transform -translate-x-1/2 py-2 px-4 rounded-3xl text-sm bg-teal-400 hover:bg-teal-500 text-teal-900 border-2 border-teal-500 font-medium opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-100 delay-200 ease-out'>View Details</button>
                <h1 className='text-teal-600 text-base text-left capitalize'>{nft?.nftCollection} <br /><span className='text-teal-50 text-lg'>{nft?.name}</span></h1>
                <h1 className='text-teal-600 text-base text-right'>Price <br /><span className='text-teal-50 text-lg'>{nft?.price}ETH</span></h1>
            </div>
        </div>
    )
}

export default NFT