import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoRocketOutline } from "react-icons/io5";
import { FaChartLine, FaClock, FaUsers, FaPercentage, FaCheck } from "react-icons/fa";
import api from '../../utils/axios';
import DepositForm from "./DepositForm";
import checkAuth from '../../middleware/authMiddleware';
import toast from 'react-hot-toast';
// import Footer from "../Home/Footer";

function Investment() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const isDepositPage = location.pathname === '/deposit';

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('investment-plans');
        if (response.data.success && response.data.data) {
          setPlans(response.data.data);
          
          if (isDepositPage && location.state?.planId) {
            const plan = response.data.data.find(p => p._id === location.state.planId);
            if (plan) setSelectedPlan(plan);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching investment plans:', err);
        setError('Failed to load investment plans');
        setLoading(false);
      }
    };

    fetchPlans();
  }, [isDepositPage, location.state]);

  const handlePlanSelect = (plan) => {
    const authToken = checkAuth();
    
    if (!authToken) {
      toast.error('Please login to continue with investment', {
        duration: 5000,
        position: 'top-right',
        style: {
          background: '#1a2234',
          color: '#fff',
          border: '1px solid #374151',
        },
      });
      
      // Save the intended destination
      navigate('/login', { 
        state: { 
          from: location.pathname,
          planId: plan._id,
          planName: plan.name
        }
      });
      return;
    }

    if (isDepositPage) {
      setSelectedPlan(plan);
      setShowDepositForm(true);
    } else {
      navigate('/deposit', { 
        state: { 
          planId: plan._id,
          planName: plan.name
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="p-8 mt-10 flex justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 mt-10 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 mt-10">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <IoRocketOutline className="text-2xl text-indigo-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Investment</p>
            <h1 className="text-white text-xl font-medium">Available Plans</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan._id} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <div className="relative bg-[#1a2234] border border-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl bg-opacity-10">
                  <FaChartLine className="text-xl text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaPercentage className="text-indigo-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Daily Profit</p>
                    <p className="text-white">{plan.dailyProfit}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaClock className="text-indigo-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white">{plan.duration} days</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <p className="text-gray-400 text-sm mb-2">Investment Range</p>
                  <p className="text-white">
                    ${plan.minAmount} - ${plan.maxAmount}
                  </p>
                </div>

                {plan.features && plan.features.length > 0 && (
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-gray-400 text-sm mb-3">Features</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-white">
                          <FaCheck className="text-green-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {plan.description && (
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>
                )}
              </div>

              <button 
                onClick={() => handlePlanSelect(plan)}
                className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition duration-300"
                disabled={plan.status !== 'active'}
              >
                {isDepositPage ? 'Select Plan' : 'Invest Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deposit Form Modal */}
      {showDepositForm && selectedPlan && (
        <DepositForm 
          plan={selectedPlan}
          onClose={() => {
            setShowDepositForm(false);
            setSelectedPlan(null);
          }}
        />
      )}
    </div>
  );
}

export default Investment;
