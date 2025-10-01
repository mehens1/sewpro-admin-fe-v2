import React from 'react';
import { Chart } from 'primereact/chart';

const ChartCard = ({title: title, type: type, data: data, options: options}) => {
  return (
    <div className="p-[2px] rounded bg-gradient-to-l from-green-500 to-red-500">
      <div className="bg-white rounded h-[320px] p-4 shadow">
        <div className="text-sm text-gray-500 mb-2">{title}</div>
        <Chart type={type} data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartCard;