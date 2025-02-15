import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { RiTimeLine, RiUserLine } from 'react-icons/ri';

const WithdrawalCard = ({ user, investment, onApprove, onReject, getTimeRemaining }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-[1px] rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500"
    >
      <div className="bg-[#111827] rounded-xl p-6">
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <RiUserLine className="text-2xl text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{user?.username || 'N/A'}</h3>
            <p className="text-gray-400 text-sm">ID: {user?.userId || 'N/A'}</p>
          </div>
        </div>

        {/* Investment Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <InfoItem label="Package" value={investment.selectedPackage} />
          <InfoItem label="Amount" value={`$${investment.amount}`} />
          <InfoItem label="Payment Method" value={investment.paymentMethod} />
          <InfoItem label="Status" value={investment.status} />
          <InfoItem 
            label="Time Remaining" 
            value={getTimeRemaining(investment.expiresAt)}
            icon={<RiTimeLine className="text-indigo-400 mr-2" />}
          />
          <InfoItem 
            label="Created" 
            value={new Date(investment.createdAt).toLocaleDateString()}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <ActionButton
            onClick={() => onApprove(investment._id, user.userId)}
            icon={<FaCheck />}
            label="Approve"
            variant="success"
          />
          <ActionButton
            onClick={() => onReject(investment._id, user.userId)}
            icon={<FaTimes />}
            label="Reject"
            variant="danger"
          />
        </div>
      </div>
    </motion.div>
  );
};

const InfoItem = ({ label, value, icon }) => (
  <div>
    <p className="text-gray-400 text-sm mb-1">{label}</p>
    <div className="flex items-center text-white font-medium">
      {icon}
      {value}
    </div>
  </div>
);

const ActionButton = ({ onClick, icon, label, variant }) => {
  const baseClasses = "flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl transition-all";
  const variantClasses = {
    success: "bg-green-500/10 text-green-400 hover:bg-green-500/20",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default WithdrawalCard; 