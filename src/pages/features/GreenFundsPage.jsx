import React from 'react';
import GreenFundSearch from '../../components/GreenFundSearch';

const GreenFundsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <GreenFundSearch />
      </div>
    </div>
  );
};

export default GreenFundsPage;