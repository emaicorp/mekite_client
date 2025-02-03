import React from 'react';
import { motion } from 'framer-motion';

const InvestmentCard = ({ investment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111827] rounded-xl p-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <InfoItem label="Package" value={investment.selectedPackage} />
        <InfoItem label="Amount" value={`$${investment.amount}`} />
        <InfoItem label="Status" value={investment.status} />
        <InfoItem label="Payment Method" value={investment.paymentMethod} />
        <InfoItem 
          label="Created" 
          value={new Date(investment.createdAt).toLocaleDateString()} 
        />
        <InfoItem 
          label="Expires" 
          value={new Date(investment.expiresAt).toLocaleDateString()} 
        />
        <InfoItem 
          label="Profit Added" 
          value={investment.isProfitAdded ? 'Yes' : 'No'} 
        />
      </div>
    </motion.div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-gray-400 text-sm mb-1">{label}</p>
    <p className="text-white font-medium">{value}</p>
  </div>
);

export default InvestmentCard; 