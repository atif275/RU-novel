// src/components/HpContainer.js

import React from 'react';

const HpContainer = ({ children }) => {
  return (
    <div
      className="
        bg-[#eff3f8]
        xl:mx-[200px] lg:mx-[100px] mx-0
        px-4 py-4
      "
    >
      {children}
    </div>
  );
};

export default HpContainer;
