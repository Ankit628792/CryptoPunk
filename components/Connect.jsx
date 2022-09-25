import React from 'react'
import { useMoralis } from 'react-moralis';

function Connect() {
    const { authenticate } = useMoralis();

    return (
        <div className="flex flex-col items-center justify-center p-2 sm:p-4">
            <img className='max-w-[300px] -mb-4 glow-sm filter drop-shadow-lg' src="/metamask.svg" alt="" />
            <h1 className="capitalize text-3xl sm:text-4xl 2xl:text-5xl font-semibold text-center py-3 sm:py-5 relative before:content-[''] before:w-60 before:h-1 before:bg-teal-300 before:absolute before:bottom-0 before:left-1/2 transform before:-translate-x-1/2 before:rounded-full">Connect to Metamask</h1>
            <button className='btn my-2' onClick={() => authenticate({ provider: "metamask", signingMessage: 'Connect to CryptoPunk' })}>Connect Wallet</button>
            <p className="text-base">Don't have Metamask? get it <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" className='text-teal-500 hover:text-orange-400' target="_blank">Here</a></p>
        </div>
    )
}

export default Connect