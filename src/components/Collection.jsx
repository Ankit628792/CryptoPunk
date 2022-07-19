import React from 'react'
import Router from 'next/router'

function Collection({ collection }) {
    return (
        <div className='w-full max-w-xs lg:max-w-sm h-96 rounded-xl overflow-hidden shadow-lg group relative m-2' onClick={() => Router.push(`/nft/collection/${collection?._id}`)}>
            <img className='w-full h-full object-cover group-hover:scale-95 rounded-xl transition-all duration-300 ease-out cursor-pointer' src={collection?.featureurl || collection?.bannerurl} alt="" />
            <div className='absolute bottom-0 left-0 w-full h-44 backdrop-filter backdrop-blur-sm bg-black bg-opacity-40 group-hover:scale-95 transition-all duration-300 ease-out'>
                <div className='h-full w-full flex items-center justify-center flex-col text-lg transform -translate-y-4 p-5'>
                    <img className='w-16 h-16 object-cover rounded-full border-4 border-solid border-gray-300' src={collection?.logourl} alt="" />
                    <h1 className='font-semibold lg:text-xl mb-2'>{collection?.name}</h1>
                    <p className='transform -translate-y-4 text-center text-gray-300 my-1'>{collection?.description?.slice(0, 80)}...</p>
                </div>
            </div>
        </div>
    )
}

export default Collection
