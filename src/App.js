import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./component/Home/Home";
import axios from "axios";
import AboutHeroSection from "./component/About/AboutHeroSection";
import ContactHeroSection from "./component/contact/ContactHeroSection";
import PlanSection from "./component/plan/PlanSection";
import TermsAndConditions from "./component/terms/TermsAndConditions";
import Register from "./component/auth/Register"
import Login from "./component/auth/Login";
import Dashboard from "./component/Dashboard/Dashboard";
import Profile from "./component/Dashboard/Profile";
import SupportPage from "./component/Dashboard/SupportPage";
import UserHistory from "./component/Dashboard/UserHistory";
import Deposit from "./component/Dashboard/Deposit";
import AdminDashboard from "./component/AdminDashbord.js/AdminDashboard";
import AdminFundUser from "./component/AdminDashbord.js/AdminFundUser";
import AdminLogin from "./component/AdminDashbord.js/AdminLogin";
import ResetPassword from "./component/auth/ResetPassword";
import ForgotPassword from "./component/auth/ForgotPassword";
import WithdrawalForm from "./component/Dashboard/WithdrawalForm";
import Logout from "./component/Dashboard/Logout";
import AdminDepositApproval from "./component/AdminDashbord.js/AdminDepositApproval";
import ReferralLink from "./component/Dashboard/ReferralLink";
import ApproveWithdrawal from "./component/AdminDashbord.js/ApproveWithdrawal";

// Mocked API endpoint for countries and languages
// const COUNTRY_API = "";
const COUNTRY_API = "https://restcountries.com/v3.1/all";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(true);
  const [countries, setCountries] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Check Network Status
  useEffect(() => {
    const checkNetwork = () => {
      setNetworkStatus(navigator.onLine);
    };
    window.addEventListener("online", checkNetwork);
    window.addEventListener("offline", checkNetwork);
    checkNetwork();
    return () => {
      window.removeEventListener("online", checkNetwork);
      window.removeEventListener("offline", checkNetwork);
    };
  }, []);

  // Fetch countries and languages
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(COUNTRY_API);
        const countryData = response.data.map((country) => ({
          name: country.name.common,
          languages: country.languages ? Object.values(country.languages) : [],
        }));
        setCountries(countryData);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    alert(`Site language changed to ${language}`);
  };

  return (
    <Router>
      {/* Language Selector */}
      <header className="bg-gray-800 text-white">
  <div className="flex justify-between items-center px-4 py-2 md:px-6">
    {/* Language Selector */}
    <div className="relative">
      <select
        className="p-2 bg-gray-700 text-white rounded-md w-full sm:w-auto"
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={selectedLanguage}
      >
        <option value="">Select Language</option>
        {countries.map((country) =>
          country.languages.map((language) => (
            <option key={`${country.name}-${language}`} value={language}>
              {language} ({country.name})
            </option>
          ))
        )}
      </select>
    </div>
  </div>
</header>


      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper
              component={Home}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/about"
          element={
            <PageWrapper
              component={AboutHeroSection}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/contact"
          element={
            <PageWrapper
              component={ContactHeroSection}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/plan"
          element={
            <PageWrapper
              component={PlanSection}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/terms"
          element={
            <PageWrapper
              component={TermsAndConditions}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

        <Route path ="/register"
          element ={
            <PageWrapper 
            component={Register}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route path ="/login"
          element ={
            <PageWrapper 
            component={Login}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route path ="/dashboard"
          element ={
            <PageWrapper 
            component={Dashboard}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route path ="/profile"
          element ={
            <PageWrapper 
            component={Profile}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/support"
          element={
            <PageWrapper
              component={SupportPage}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/settings"
          element={
            <PageWrapper
              component={UserHistory}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/deposit"
          element={
            <PageWrapper
              component={Deposit}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/admin-dashboard"
          element={
            <PageWrapper
              component={AdminDashboard}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/fund"
          element={
            <PageWrapper
              component={AdminFundUser}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/admin-login"
          element={
            <PageWrapper
              component={AdminLogin}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/transactions"
          element={
            <PageWrapper
              component={WithdrawalForm}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/reset-password"
          element={
            <PageWrapper
              component={ResetPassword}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/forgot-password"
          element={
            <PageWrapper
              component={ForgotPassword}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/logout"
          element={
            <PageWrapper
              component={Logout}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />

<Route
          path="/deposit-approval"
          element={
            <PageWrapper
              component={AdminDepositApproval}
              loading={loading}
              setLoading={setLoading}
              networkStatus={networkStatus}
            />
          }
        />


<Route 
          path="referral"
          element={
            <PageWrapper
            component={ReferralLink}
            loading={loading}
            setLoading={setLoading}
            networkStatus={networkStatus}
            />
          }
        />

<Route 
          path="/approve"
          element={
            <PageWrapper
            component={ApproveWithdrawal}
            loading={loading}
            setLoading={setLoading}
            networkStatus={networkStatus}
            />
          }
        />
        {/* Add other routes here */}
      </Routes>

      
      
    </Router>
  );
};

const PageWrapper = ({ component: Component, loading, setLoading, networkStatus }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = async () => {
      setLoading(true);
      if (networkStatus) {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate loading
        setLoading(false);
      } else {
        setLoading(false);
        alert("Network is poor. Unable to load the page.");
        navigate("/");
      }
    };
    handleNavigation();
  }, [networkStatus, navigate, setLoading]);

  return (
    <div className="relative">
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="animate-spin text-yellow-400 text-4xl">💰</div>
        </div>
      ) : (
        <Component />
      )}
    </div>
  );
};

export default App;
