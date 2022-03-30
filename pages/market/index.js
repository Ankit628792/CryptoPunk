import React from 'react'
import millify from 'millify'
import { Currencies, Loader, News } from '../../components';
import { useGetCryptosQuery } from '../../crypto/cryptoApi';
import Router from 'next/router';

const Card = ({ title, value }) => (
    <div className='glow backdrop-filter backdrop-blur bg-teal-800 hover:bg-opacity-30 hover:scale-105 transition-all duration-150 ease-out bg-opacity-10 w-full rounded-xl pt-5 px-8 text-white max-w-[210px]'>
        <h1 className={`relative text-lg md:text-xl font-medium mb-4 text-zinc-400 pb-2 before:content-[''] before:w-1/2 before:h-1 before:bg-teal-300 before:absolute before:bottom-0 before:left-0 before:rounded-full`}>{title}</h1>
        <p className='text-2xl md:text-3xl font-bold text-gray-200 leading-3'>
            {value}
            {/* <br />
            <span className='text-teal-400 font-medium text-base'>0.50%</span> */}
        </p>
    </div>
)

function index() {
    const { data, isFetching } = useGetCryptosQuery(10);
    if (isFetching) return <Loader />
    const globalStats = data?.data?.stats
    return (
        <>
            <section className={`p-5 sm:p-10 lg:flex lg:flex-row-reverse items-center justify-around max-w-6xl 2xl:max-w-7xl mx-auto opac`}>
                <div className='w-full p-5 grid place-items-center'>
                    <img className='glow-sm h-full max-h-[450px] object-contain' src='/assets/images/analyse.svg' alt="" />
                </div>
                <div className='w-full text-center lg:text-left p-5 max-w-xl 2xl:max-w-2xl mx-auto'>
                    <h1 className='capitalize text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold'>Today's Cryptocurrency Prices</h1>
                    <p className='text-base sm:text-lg lg:text-xl 2xl:text-2xl max-w-3xl font-medium mx-auto text-zinc-300'>The global crypto market cap is <span className='text-teal-400'>${millify(globalStats?.totalMarketCap)}</span></p>
                </div>
            </section>

            <h1 className='font-bold text-2xl md:text-3xl 2xl:text-4xl text-center block'>
                    Today's Market Value
                </h1>
            <div className='flex items-center gap-5 sm:gap-10 justify-evenly max-w-5xl flex-wrap mx-auto py-10 mb-10'>
                <Card title={'Total Exchanges'} value={`${millify(globalStats?.totalExchanges)}`} />
                <Card title={'Total Markets'} value={`${millify(globalStats?.totalMarkets)}`} />
                <Card title={'Total 24h Volume'} value={`$${millify(globalStats?.total24hVolume)}`} />
                <Card title={'Total Coins'} value={`${millify(globalStats?.total)}`} />
            </div>

            <div className='flex justify-between items-end sm:items-center max-w-7xl mx-auto px-5'>
                <h1 className='font-bold text-xl md:text-2xl 2xl:text-3xl'>
                    Top 10 Cryptocurrencies <span className='hidden sm:inline-block'>in the world</span>
                </h1>
                <p className='text-teal-400 hover:text-teal-600 text-xs sm:text-lg md:text-xl cursor-pointer' onClick={() => Router.push('/market/cryptocurrencies')}>Show More</p>
            </div>
            
            <Currencies simplified />

            <div className='flex justify-between items-end sm:items-center max-w-7xl mx-auto px-5 sm:px-10'>
                <h1 className='font-bold text-xl md:text-2xl 2xl:text-3xl'>
                    Latest Crypto News
                </h1>
                <p className='text-teal-400 hover:text-teal-600 text-xs sm:text-lg md:text-xl cursor-pointer' onClick={() => Router.push('/market/news')}>Show More</p>
            </div>
            <News simplified />
        </>
    )
}

export default index
