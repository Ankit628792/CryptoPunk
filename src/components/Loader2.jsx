import React from 'react';

const Loader = ({ text }) => (
  <>
    <div className="h-[80vh] flex items-center justify-center flex-col">
      <div className="loader2__container">
        <div className="loader2"><span></span></div>
      </div>
    </div>
  </>
);

export default Loader;