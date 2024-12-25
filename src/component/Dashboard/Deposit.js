import React,{useState,useEffect} from "react";
import Sidebar from "./Sidebar";
import { MdNightlife } from "react-icons/md";
// import axios from "axios";
// import { getUserDetails } from "./localStorageUtils";

const plans = [
  {
    name: "Lite Plan (Forex)",
    icon: <MdNightlife className="text-purple-500 text-4xl" />,
    rate: "5% Daily",
    details: {
      minimum: "$100",
      maximum: "$999",
      duration: "5 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },
  {
    name: "Active Plan (Forex)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "10% Daily",
    details: {
      minimum: "$1,000",
      maximum: "$4,999",
      duration: "5 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Active Plan (Forex)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "15% Daily",
    details: {
      minimum: "$5,000",
      maximum: "Unlimited",
      duration: "5 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Starter Plan (Cryptocurrency)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "5% Daily",
    details: {
      minimum: "$50",
      maximum: "$999",
      duration: "5 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Premium Plan (Cryptocurrency)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "10% Daily",
    details: {
      minimum: "$1000",
      maximum: "$5,999",
      duration: "5 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Professional Plan (Cryptocurrency)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "15% Daily",
    details: {
      minimum: "$5000",
      maximum: "Unlimited",
      duration: "5 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Silver Plan (Cannabis)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "5% Daily",
    details: {
      minimum: "$500",
      maximum: "$4,999",
      duration: "30 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Gold Plan (Cannabis)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "10% Daily",
    details: {
      minimum: "$500",
      maximum: "$Unlimited",
      duration: "30 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Basic Plan (Real Estate)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "10% Daily",
    details: {
      minimum: "$1000",
      maximum: "$4,999",
      duration: "30 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Silver Plan (Cannabis)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "5% Daily",
    details: {
      minimum: "$500",
      maximum: "$4,999",
      duration: "30 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Gold Plan (Cannabis)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "10% Daily",
    details: {
      minimum: "$5000",
      maximum: "Unlimited",
      duration: "30 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Ethusiast Plan (Real Estate)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "15% Daily",
    details: {
      minimum: "$5000",
      maximum: "Unlimited",
      duration: "30 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Novice Plan (Pension Funds)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "5% Daily",
    details: {
      minimum: "$500",
      maximum: "$4,999",
      duration: "30 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Ethusiast Plan (Pension Funds)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "10% Daily",
    details: {
      minimum: "$5,000",
      maximum: "Unlimited",
      duration: "30 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Rookie Plan (NFP)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "5% Daily",
    details: {
      minimum: "$500",
      maximum: "$4,999",
      duration: "30 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },

  {
    name: "Social Plan (Cannabis)",
    icon: <MdNightlife className="text-blue-500 text-4xl" />,
    rate: "10% Daily",
    details: {
      minimum: "$5,000",
      maximum: "Unlimited",
      duration: "30 Days",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw"],
  },
  // Add more plans here
];

function Deposit() {
  
  return (
    <>
      <Sidebar />
      <section className="bg-gray-100 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
        <InvestForm />
      </section>
    </>
  );
}

function PlanCard({ plan }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Plan Header */}
      <header className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-4">
          {plan.icon}
          <h2 className="text-xl font-bold text-purple-700">{plan.name}</h2>
        </div>
        <p className="text-2xl font-extrabold text-green-600">{plan.rate}</p>
      </header>

      {/* Plan Details */}
      <PlanDetails details={plan.details} />

      {/* Features */}
      <PlanFeatures features={plan.features} />
    </div>
  );
}

function PlanDetails({ details }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800">Plan Details</h3>
      <div className="mt-2 space-y-1 text-gray-700">
        <p>
          <span className="font-bold">Minimum:</span> {details.minimum}
        </p>
        <p>
          <span className="font-bold">Maximum:</span> {details.maximum}
        </p>
        <p>
          <span className="font-bold">Duration:</span> {details.duration}
        </p>
      </div>
    </div>
  );
}

function PlanFeatures({ features }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800">Features</h3>
      <ul className="mt-2 space-y-1 text-gray-700">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-green-500">✔️</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


const InvestForm = () => {
  const [userId, setUserId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [investment, setInvestment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPackage || !paymentMethod || !amount) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const requestBody = {
      userId,
      selectedPackage,
      paymentMethod,
      amount,
    };

    try {
      const response = await fetch('https://mekite-crypto.onrender.com/api/invest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setInvestment(data.investment);
      } else {
        setMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error submitting investment:', error);
      setMessage('Server error. Please try again later.');
    }
  };

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500">
        <span className="text-white text-2xl font-semibold">Loading User Details...</span>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Invest Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">User ID</label>
          <input
            type="text"
            value={userDetails.id}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full border p-2 rounded"
            readOnly
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Selected Package</label>
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select a Plan</option>
            {plans.map((plan, index) => (
              <option key={index} value={plan.name}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="Bitcoin">itcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="USDT">USDT</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
            disabled={!selectedPackage || !paymentMethod || !amount}
          >
            Submit Investment
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-4 text-center text-lg font-semibold">
          {message}
        </div>
      )}
    </div>
  );
};


// Modal Component for Plan Details
function PlanDetailsModal({ plan, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            ✖
          </button>
        </header>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Plan Details</h3>
          <div className="mt-2 space-y-1 text-gray-700">
            <p>
              <span className="font-bold">Minimum:</span> {plan.details.minimum}
            </p>
            <p>
              <span className="font-bold">Maximum:</span> {plan.details.maximum}
            </p>
            <p>
              <span className="font-bold">Duration:</span> {plan.details.duration}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Features</h3>
          <ul className="mt-2 space-y-1 text-gray-700">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-green-500">✔️</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
