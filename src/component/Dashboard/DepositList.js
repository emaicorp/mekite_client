import React,{useState,useEffect} from 'react'
import Sidebar from './Sidebar'

function DepositList() {
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
            <span className="text-white text-2xl font-semibold">Loading...</span>
          </div>
        );
      }
  return (
    <>
    <Sidebar />
        <div className="container mx-auto p-6 bg-gray-50">
  <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Your Deposits</h1>
  <p className="text-center text-gray-700 font-semibold mb-10">Total: {`$${userDetails.availableBalance}`}</p>

  {[
    {
      category: "Forex",
      plans: [
        { name: "Lite plan", range: "$100.00 - $999.00", profit: "5.00" },
        { name: "Active", range: "$1000.00 - $4999.00", profit: "10.00" },
        { name: "Master", range: "$5000.00 and more", profit: "15.00" },
      ],
    },
    {
      category: "Cryptocurrency",
      plans: [
        { name: "Starter", range: "$50.00 - $999.00", profit: "5.00" },
        { name: "Premium", range: "$1000.00 - $4999.00", profit: "10.00" },
        { name: "Professional", range: "$5000.00 and more", profit: "15.00" },
      ],
    },
    {
      category: "Cannabis",
      plans: [
        { name: "Silver", range: "$500.00 - $4999.00", profit: "5.00" },
        { name: "Gold", range: "$5000.00 and more", profit: "10.00" },
      ],
    },
    {
      category: "Real Estate",
      plans: [
        { name: "Basic", range: "$1000.00 - $4999.00", profit: "10.00" },
        { name: "Ethusiast", range: "$5000.00 and more", profit: "15.00" },
      ],
    },
    {
      category: "Pension Funds",
      plans: [
        { name: "Novice", range: "$500.00 - $4999.00", profit: "5.00" },
        { name: "Ethusiast", range: "$5000.00 and more", profit: "10.00" },
      ],
    },
    {
      category: "NFP",
      plans: [
        { name: "Rookie", range: "$500.00 - $4999.00", profit: "5.00" },
        { name: "Social", range: "$5000.00 and more", profit: "10.00" },
      ],
    },
  ].map(({ category, plans }, index) => (
    <div key={index} className="mb-6">
      <h2 className="text-xl font-bold text-blue-500 mb-4">{category}</h2>
      {plans.map((plan, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
          <p className="text-gray-600">
            <span className="font-medium">Deposit Amount:</span> {plan.range}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Daily Profit (%):</span> {plan.profit}
          </p>
          <p className="text-red-500 mt-2">No deposits for this plan</p>
        </div>
      ))}
    </div>
  ))}
</div>

    </>
  )
}

export default DepositList