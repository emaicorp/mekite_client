import React from 'react';
import { IoWalletOutline, IoTimeOutline, IoSettingsOutline, IoFlashOutline, IoTrendingUpOutline } from 'react-icons/io5';

const WithdrawalReasons = () => {
  const detailedReasons = [
    {
      title: "Access Your Funds Anytime",
      description:
        "Your funds are always accessible to you. Whether you're saving for an emergency or making an investment, you can withdraw your money at your convenience.",
      icon: IoWalletOutline,
    },
    {
      title: "Emergency Needs",
      description:
        "We understand that emergencies arise unexpectedly. Our quick withdrawal process ensures you can access funds whenever you need them.",
      icon: IoTimeOutline,
    },
    {
      title: "Seamless Account Management",
      description:
        "Easily manage your funds with our intuitive platform. Withdraw money to transfer to another account or use it for payments.",
      icon: IoSettingsOutline,
    },
    {
      title: "No Hidden Fees",
      description:
        "We provide a transparent withdrawal process with no hidden charges, ensuring you get the full amount you're entitled to.",
      icon: IoFlashOutline,
    },
    {
      title: "Investment Opportunities",
      description:
        "Use your funds to seize investment opportunities without delays. Quick access to your money helps you achieve your financial goals.",
      icon: IoTrendingUpOutline,
    },
  ];

  const summarizedReasons = [
    "Personal Financial Needs: Users may need to withdraw funds for personal expenses or emergencies.",
    "Investment Opportunities: Users might find new investment opportunities that require immediate capital.",
    "Business Expenses: Entrepreneurs may need to withdraw funds to cover business-related expenses.",
    "Education: Users may withdraw funds to pay for educational expenses such as tuition fees or books.",
    "Medical Expenses: Users might need to withdraw money to cover unexpected medical bills.",
    "Travel: Users may withdraw funds to cover travel expenses for vacations or business trips.",
  ];

  return (
    <div className="mt-8 sm:mt-12">
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-medium text-white mb-2">
          Withdrawal Benefits
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Our platform ensures a secure and efficient withdrawal process for all users
        </p>
      </div>

      {/* Detailed Reasons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {detailedReasons.map((reason, index) => (
          <div key={index} className="relative">
            <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="relative bg-[#1a2234] rounded-2xl p-4 sm:p-6 h-full">
                <div className="p-3 bg-indigo-500/10 rounded-xl w-fit mb-4">
                  <reason.icon className="text-xl sm:text-2xl text-indigo-500" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">{reason.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{reason.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Reasons Section */}
      <div className="relative">
        <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
          <div className="relative bg-[#1a2234] rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-medium text-white mb-4">
              Additional Withdrawal Reasons
            </h2>
            <ul className="space-y-3">
              {summarizedReasons.map((reason, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-gray-400 text-sm sm:text-base"
                >
                  <div className="p-1 bg-indigo-500/10 rounded-full mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  </div>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalReasons;
