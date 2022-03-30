import React from 'react';
import millify from 'millify';
import { Row, Col, Avatar } from 'antd';
import Loader from '../../components/Loader';
import { useGetExchangesQuery } from '../../crypto/cryptoExchangeApi';

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();

  if (isFetching) return <Loader />;

  return (
    <>
      <div className='p-5 min-w-[769px] max-w-7xl mx-auto'>
        <Row className='text-xl md:text-2xl 2xl:text-3xl font-semibold my-2 py-2 text-teal-400'>
          <Col span={1}>#</Col>
          <Col span={6}>Exchanges</Col>
          <Col span={6}>24h Trade Volume</Col>
          <Col span={5}>Country</Col>
          <Col span={6}>Website URL</Col>
        </Row>
        <Row>
          <Col span={24}>
          {data?.map((exchange) => (
              <Row key={exchange?.id} className='my-2 py-2 items-center text-base md:text-lg 2xl:text-xl text-teal-50'>
                <Col span={1}>
                  <span><strong>{exchange?.trust_score_rank}.</strong></span>
                </Col>
                <Col span={6} className='space-x-4'>
                  <Avatar src={exchange?.image} />
                  <span><strong>{exchange?.name}</strong></span>
                </Col>
                <Col span={6}>${millify(exchange?.trade_volume_24h_btc)}</Col>
                <Col span={5}>{exchange?.country}</Col>
                <Col span={6}><a href={exchange?.url} target="_blank" className='text-teal-400 hover:text-teal-600'>{exchange?.name}</a></Col>
              </Row>
          ))}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Exchanges;