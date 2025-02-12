import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageWrapper from '../components/common/PageWrapper';
// Import all your components
import Home from '../components/Home/Home';
import AboutHeroSection from '../components/About/AboutHeroSection';
import ContactHeroSection from '../components/contact/ContactHeroSection';
import PlanSection from '../components/plan/PlanSection';
import TermsAndConditions from '../components/terms/TermsAndConditions';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import Profile from '../components/Dashboard/Profile';
import SupportPage from '../components/Dashboard/SupportPage';
import UserHistory from '../components/Dashboard/UserHistory';
import Deposit from '../components/Dashboard/Deposit';
import AdminDashboard from '../components/AdminDashbord.js/AdminDashboard';
import AdminFundUser from '../components/AdminDashbord.js/AdminFundUser';
import AdminLogin from '../components/AdminDashbord.js/AdminLogin';
import ResetPassword from '../components/auth/ResetPassword';
import ForgotPassword from '../components/auth/ForgotPassword';
import WithdrawalForm from '../components/Dashboard/WithdrawalForm';
import Logout from '../components/Dashboard/Logout';
import AdminDepositApproval from '../components/AdminDashbord.js/AdminDepositApproval';
import ReferralLink from '../components/Dashboard/ReferralLink';
import ApproveWithdrawal from '../components/AdminDashbord.js/ApproveWithdrawal';
import Bonuses from '../components/AdminDashbord.js/Bonuses';
import ManageInvestmentPlans from '../components/AdminDashbord.js/ManageInvestmentPlans';
import Wallets from '../components/AdminDashbord.js/wallets';
import AdminEmails from '../components/AdminDashbord.js/AdminEmails';
const AppRoutes = ({ loading, setLoading, networkStatus }) => {
  const wrapComponent = (Component) => (
    <PageWrapper
      component={Component}
      loading={loading}
      setLoading={setLoading}
      networkStatus={networkStatus}
    />
  );

  return (
    <Routes>
      <Route path="/" element={wrapComponent(Home)} />
      <Route path="/about" element={wrapComponent(AboutHeroSection)} />
      <Route path="/contact" element={wrapComponent(ContactHeroSection)} />
      <Route path="/plan" element={wrapComponent(PlanSection)} />
      <Route path="/terms" element={wrapComponent(TermsAndConditions)} />
      <Route path="/register" element={wrapComponent(Register)} />
      <Route path="/login" element={wrapComponent(Login)} />
      <Route path="/dashboard" element={wrapComponent(Dashboard)} />
      <Route path="/profile" element={wrapComponent(Profile)} />
      <Route path="/support" element={wrapComponent(SupportPage)} />
      <Route path="/settings" element={wrapComponent(UserHistory)} />
      <Route path="/deposit" element={wrapComponent(Deposit)} />
      <Route path="/admin-dashboard" element={wrapComponent(AdminDashboard)} />
      <Route path="/fund" element={wrapComponent(AdminFundUser)} />
      <Route path="/admin-login" element={wrapComponent(AdminLogin)} />
      <Route path="/transactions" element={wrapComponent(WithdrawalForm)} />
      <Route path="/reset-password" element={wrapComponent(ResetPassword)} />
      <Route path="/forgot-password" element={wrapComponent(ForgotPassword)} />
      <Route path="/logout" element={wrapComponent(Logout)} />
      <Route path="/deposit-approval" element={wrapComponent(AdminDepositApproval)} />
      <Route path="/referral" element={wrapComponent(ReferralLink)} />
      <Route path="/approve" element={wrapComponent(ApproveWithdrawal)} />
      <Route path="/bonus" element={wrapComponent(Bonuses)} />
      <Route path="/investment-plans" element={wrapComponent(ManageInvestmentPlans)} />
      <Route path="/wallets" element={wrapComponent(Wallets)} />
      <Route path="/emails" element={wrapComponent(AdminEmails)} />
    </Routes>
  );
};

export default AppRoutes; 