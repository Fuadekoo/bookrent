// "use client";

import React from 'react';
import Sidebar from './Sidebar';

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="scroll-m-1">
          <div className="flex justify-between items-center bg-white rounded p-4">
            <h1 className="text-2xl font-bold">book Rent System</h1>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;