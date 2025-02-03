import React from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const EmptyState = ({ message }) => (
  <div className="text-center py-8">
    <RiMoneyDollarCircleLine className="text-4xl text-gray-600 mx-auto mb-4" />
    <p className="text-gray-400">{message}</p>
  </div>
);

export default EmptyState; 