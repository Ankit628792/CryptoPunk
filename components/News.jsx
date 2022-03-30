import { Card, Col, Row, Select, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
import React, { useState } from 'react'
import { useGetCryptosQuery } from '../crypto/cryptoApi';
import { useGetCryptoNewsQuery } from '../crypto/cryptoNewsApi';
import Loader from './Loader';

const { Text, Title } = Typography
const { Option } = Select
const demoImage = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'
function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: `${newsCategory} currency`, count: simplified ? 6 : 14 });
  const { data: cryptosList, isFetching } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />

  return (
    <>
      {!simplified &&
        <div className='max-w-xs sm:max-w-xs md:max-w-md mx-auto border border-zinc-500 focus-within:border-teal-400 my-4'>
          <Select showSearch className='w-full' placeholder='Select a Crypto' optionFilterProp='childern' onChange={(value) => setNewsCategory(value)} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {cryptosList?.data?.coins?.map((coin) => <Option value={coin.name} key={coin.uuid}>{coin.name}</Option>)}
          </Select>
        </div>
      }

      <section className='flex flex-wrap items-stretch justify-center gap-10 py-10 max-w-7xl'>
        {cryptoNews?.value?.map((news, i) => (
          <a href={news.url} key={i}>
            <div className='glow-sm max-w-[350px] p-5 rounded-xl m-2 shadow-xl bg-teal-400 bg-opacity-5 hover:scale-105 transition-all duration-200 ease-out'>
              <div className='flex '>
                <h4 className='line-clamp-3 text-lg md:text-lg 2xl:text-xl'>
                  {news.name}
                </h4>
                <img className='flex-shrink-0 p-2 rounded-2xl max-w-[100px] max-h-[100px] object-cover' src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
              </div>
              <p className='text-sm md:text-base text-gray-300'>
                {news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}          </p>
              <div className='flex space-x-2'>
                <Avatar size={48} src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                <p className='text-gray-100'>{news.provider[0]?.name} <br />
                  <span className='text-sm italic text-zinc-400'>{moment(news.datePublished).startOf('ss').fromNow()}</span></p>
              </div>
            </div>
          </a>
        ))}
      </section>

    </>
  )
}

export default News