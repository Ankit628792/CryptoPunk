import React from 'react';
import { Spin, Typography } from 'antd';

const Loader = ({ text }) => (
  <>
    <div className="h-[80vh] flex items-center justify-center flex-col">
      <div className="loader__container">
        <div className="loader"><span></span></div>
      </div>
      {/* {text && <Typography.Title level={3}>{text}</Typography.Title>}
    <Spin size='large' /> */}
    </div>
  </>
);

export default Loader;