import React, { useRef } from 'react';

const Card = ({ income, expense, balance, showIncomeModal, showExpenceModal }) => {
  const chartRef = useRef(null);

  const scrollToChart = () => {
    if (chartRef.current) {
      chartRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='mt-6'>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Current Balance</h2>
          <p className="text-3xl font-bold text-blue-600">₹{balance}</p>
          <button 
            onClick={scrollToChart}
            className="mt-3 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Go to table
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Income</h2>
          <p className="text-3xl font-bold text-green-500">₹{income}</p>
          <button
            onClick={showIncomeModal}
            className="mt-3 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Add Income
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Expenses</h2>
          <p className="text-3xl font-bold text-red-500">₹{expense}</p>
          <button 
            onClick={showExpenceModal}
            className="mt-3 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            Add Expense
          </button>
        </div>
      </div>
      {/* Hidden ref for scrolling */}
      <div ref={chartRef} />
    </div>
  );
};

export default Card;
