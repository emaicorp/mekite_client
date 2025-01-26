import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SideBard from "./SideBard";
import DeleteUser from "./DeleteUser";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://mekite-btc.onrender.com/api/all-users"
        );
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1920 }, items: 5 },
    desktop: { breakpoint: { max: 1920, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-red-500">{error}</div>;

  return (
    <>
      <SideBard />
      <div className="p-5">
        <h1 className="text-center text-2xl font-bold mb-4">All Users</h1>
        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={10000}>
          {users.map((user, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow-md bg-white text-center"
            >
              <h2 className="font-semibold text-lg">{user.fullName}</h2>
              <p className="text-gray-600">Username: {user.username}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Role: {user.role}</p>
              <p className="text-gray-600">
                Last Seen: {new Date(user.lastSeen).toLocaleString()}
              </p>
              <p
                className={`text-sm ${
                  user.isOnline ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.isOnline ? "Online" : "Offline"}
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600">
                  View Details
                </summary>
                <div className="mt-2 text-left text-sm">
                  <p><strong>Bitcoin Wallet:</strong> {user.bitcoinWallet}</p>
                  <p><strong>Ethereum Wallet:</strong> {user.ethereumWallet}</p>
                  <p><strong>USDT Wallet:</strong> {user.usdtWallet}</p>
                  <p><strong>Referral Link:</strong> {user.referralLink}</p>
                  <p><strong>Total Earnings:</strong> ${user.totalEarnings}</p>
                  <p><strong>Total Withdrawals:</strong> ${user.totalWithdrawals}</p>
                  <p><strong>Bitcoin Available:</strong> ${user.bitcoinAvailable}</p>
                  <p><strong>Bitcoin Pending:</strong> ${user.bitcoinPending}</p>
                  <p><strong>Ethereum Available:</strong> ${user.ethereumAvailable}</p>
                  <p><strong>Ethereum Pending:</strong> ${user.ethereumPending}</p>
                  <p><strong>USDT Available:</strong> ${user.usdtAvailable}</p>
                  <p><strong>USDT Pending:</strong> ${user.usdtPending}</p>
                  <p><strong>Location:</strong> {user.location?.country}, {user.location?.city}</p>
                  <p><strong>Investments:</strong></p>
                  <ul className="list-disc pl-5">
                    {user.investments.map((investment, i) => (
                      <li key={i}>
                        {investment.selectedPackage} - ${investment.amount} ({investment.status})
                      </li>
                    ))}
                  </ul>
                  <p><strong>Upline:</strong> {user.upline}</p>
                  <p><strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}</p>
                  <p><strong>Account Status:</strong></p>
                  <ul>
                    <li><strong>Disabled:</strong> {user.isDisabled ? "Yes" : "No"}</li>
                    <li><strong>Suspended:</strong> {user.isSuspended ? "Yes" : "No"}</li>
                  </ul>
                  <p><strong>Referrals:</strong></p>
                  <ul className="list-disc pl-5">
                    {user.referrals.map((referral, i) => (
                      <li key={i}>
                        {referral.referredBy} - {referral.status} (${referral.commission})
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          ))}
        </Carousel>
      </div>

      <DeleteUser />
    </>
  );
}

export default AdminDashboard;
