import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../crypto/cryptoApi';
import { useRouter } from 'next/router';
import { Loader, LineChart } from '../../components';

const { Option } = Select;

const Crypto = () => {
  const router = useRouter()
  const { coinId } = router.query
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="max-w-5xl p-5 xl:px-10">
      <Col className="text-center">
        <h1 className="text-teal-400 text-4xl font-bold lg:text-5xl">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </h1>
        <p className='text-lg lg:text-xl text-gray-400'>{cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <div className='max-w-max ml-auto border border-zinc-500 focus-within:border-teal-400 my-4'>

        <Select defaultValue="7d" style={{ width: 120 }} placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
          {time.map((date, i) => <Option key={i}>{date}</Option>)}
        </Select>
      </div>
      {coinHistory && <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />}
      <Col className="lg:flex mt-10">
        <Col className="p-5 xl:px-10">
          <Col>
            <h1 className="text-2xl 2xl:text-3xl font-medium">{cryptoDetails?.name} Value Statistics</h1>
            <p className='text-lg lg:text-xl text-gray-400'>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }, i) => (
            <Col className="flex items-center justify-between text-base my-3 lg:text-lg" key={value+i}>
              <Col className='flex space-x-2 items-center'>
                <h1>{icon}</h1>
                <h1>{title}</h1>
              </Col>
              <h1>{value}</h1>
            </Col>
          ))}
        </Col>
        <Col className="p-5 xl:px-10">
          <Col>
            <h1 className='text-xl lg:text-2xl 2xl:text-3xl font-medium'>Other Stats Info</h1>
            <p className='text-lg lg:text-xl text-gray-400'>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }, i) => (
            <Col className="flex items-center justify-between text-base my-3 lg:text-lg" key={ value + i}>
              <Col className='flex space-x-2 items-center'>
                <h1>{icon}</h1>
                <h1>{title}</h1>
              </Col>
              <h1>{value}</h1>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="lg:flex lg:justify-between p-5">
        <Col className="max-w-2xl coin__desc lg:w-1/2">
          <h1 className="text-xl lg:text-2xl 2xl:text-3xl font-medium">What is {cryptoDetails?.name}?</h1>
          {HTMLReactParser(cryptoDetails?.description)}
        </Col>
        <Col className="flex-shrink-0 lg:w-5/12">
          <h1 className="text-xl lg:text-2xl 2xl:text-3xl font-medium">{cryptoDetails?.name} Links</h1>
          {cryptoDetails?.links?.map((link,i) => (
            <Row className="flex items-center justify-between gap-x-8" key={i+link.name}>
              <h1 className="text-lg lg:text-xl font-medium ">{link.type}</h1>
              <a href={link?.url} className='text-teal-400 hover:text-teal-600 text-lg' target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default Crypto;