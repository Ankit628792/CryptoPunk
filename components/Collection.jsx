import React from 'react'
import Router from 'next/router'

function Collection() {
    return (
        <div className='w-full max-w-xs lg:max-w-sm h-96 rounded-xl overflow-hidden shadow-lg group relative m-2' onClick={() => Router.push(`/nft/collection/${Date.now()}`)}>
            <img className='w-full h-full object-cover group-hover:scale-95 rounded-xl transition-all duration-300 ease-out cursor-pointer' src="https://lh3.googleusercontent.com/TS2mwNzus7SqEjSjKVu7Gmj1lpnZc4u8x-wrvTlZvU7jEVMHLi3edj7TyudKaKvSM79x_0ORmQc0ATXotUJsBNrrE8j5MY4piS7aM6Q=h200" alt="" />
            <div className='absolute bottom-0 left-0 w-full h-44 backdrop-filter backdrop-blur-sm bg-black bg-opacity-40 group-hover:scale-95 transition-all duration-300 ease-out'>
                <div className='h-full w-full flex items-center justify-center flex-col text-lg transform -translate-y-4 p-5'>
                    <img className='w-16 h-16 object-cover rounded-full border-4 border-solid border-gray-300' src="https://storage.googleapis.com/opensea-static/opensea-profile/16.png" alt="" />
                    <h1 className='font-semibold'>Quirkies Deployer</h1>
                    <p className='transform -translate-y-2 text-base'>by <span className='text-teal-400 cursor-pointer'>QuirkiesDeployer</span></p>
                    <p className='transform -translate-y-4 text-center text-gray-200'>5,000 Quirkies brought into the metaverse to celebrate everyone's quirks'</p>
                </div>
            </div>
        </div>
    )
}

export default Collection