import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { useGetCryptosQuery } from '../crypto/cryptoApi';
import Loader from './Loader';
import Router from 'next/router';


function Currencies({ simplified }) {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])

  if (isFetching) return <Loader />
  return (
    <>
      {!simplified && <div className='max-w-md mx-auto p-1 rounded-full border border-zinc-500 focus-within:border-teal-200 my-4'>
        <input type='text' className='py-2 text-lg px-4 w-full bg-transparent border-0 outline-none' placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
      </div>}

      <section className='flex flex-wrap items-end justify-center gap-x-12 gap-y-20 py-20 max-w-7xl'>
        {cryptos?.map((currency) => (
          <div key={currency.uuid} className='crypto__card glow-sm' onClick={() => Router.push(`/market/crypto?coinId=${currency.uuid}`)}>
            <h1 className={`text-xl xl:text-2xl font-bold text-zinc-100`}>{currency.name}</h1>
            <img className='absolute z-10 w-16 h-16 rounded object-cover -top-9 left-1/2 transform -translate-x-1/2' src={currency.iconUrl} alt="" />
            <p className='text-lg text-gray-400 leading-loose'> Price : <span className='font-medium text-white'>${Math.round(+currency.price * 100) / 100}</span>
              <br /> Change: <span className={`font-medium ${currency.change < 0 ? 'text-red-400' : 'text-green-400'}`}>{currency.change}%</span>
              <br /> Market Cap: <span className='font-medium text-white'>${millify(currency.marketCap)}</span>
            </p>
          </div>
        ))}
      </section>
    </>
  )
}

export default Currencies