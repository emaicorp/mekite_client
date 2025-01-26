import React from 'react';

const WithdrawalReasons = () => {
  const detailedReasons = [
    {
      title: "Access Your Funds Anytime",
      description:
        "Your funds are always accessible to you. Whether you're saving for an emergency or making an investment, you can withdraw your money at your convenience.",
      icon: "💳",
    },
    {
      title: "Emergency Needs",
      description:
        "We understand that emergencies arise unexpectedly. Our quick withdrawal process ensures you can access funds whenever you need them.",
      icon: "⏱️",
    },
    {
      title: "Seamless Account Management",
      description:
        "Easily manage your funds with our intuitive platform. Withdraw money to transfer to another account or use it for payments.",
      icon: "📂",
    },
    {
      title: "No Hidden Fees",
      description:
        "We provide a transparent withdrawal process with no hidden charges, ensuring you get the full amount you're entitled to.",
      icon: "💡",
    },
    {
      title: "Investment Opportunities",
      description:
        "Use your funds to seize investment opportunities without delays. Quick access to your money helps you achieve your financial goals.",
      icon: "📈",
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
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Reasons for Withdrawal
      </h1>

      {/* Detailed Reasons Section */}
      <div className="text-center text-gray-600 mb-8">
        <p>
          Our company ensures a hassle-free and secure withdrawal process for all users. Here are some key benefits:
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {detailedReasons.map((reason, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            <div className="text-4xl text-blue-500 mb-4">{reason.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">{reason.title}</h2>
            <p className="text-gray-600 mt-2">{reason.description}</p>
          </div>
        ))}
      </div>

      {/* Summarized Reasons Section */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Reasons</h2>
      <ul className="bg-white p-6 rounded-lg shadow-md list-disc list-inside">
        {summarizedReasons.map((reason, index) => (
          <li key={index} className="text-gray-700 text-lg mb-2">
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WithdrawalReasons;
