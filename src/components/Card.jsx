import React from 'react';

const Card = ({ icon: icon, label: label, value: value }) => {
  return (
    <div
      className={`flex flex-col md:flex-row justify-center items-center gap-4 px-5 rounded-lg shadow bg-white ${label === 'Out of Stock' ? 'border-l-4 border-red-500' : ''
        } h-36`}
    >
      <div>{icon}</div>
      <div>
        <div className="text-gray-600 text-sm">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default Card;
