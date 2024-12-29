import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SideBard from './SideBard'
import DeleteUser from "./DeleteUser";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://mekite-btc.onrender.com/api/all-users");
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
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000}>
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
            <p className={`text-sm ${user.isOnline ? "text-green-500" : "text-red-500"}`}>
              {user.isOnline ? "Online" : "Offline"}
            </p>
            {/* Expandable section */}
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-600">View Details</summary>
              <div className="mt-2 text-left text-sm">
                <p><strong>Wallet Address:</strong> {user.walletAddress}</p>
                <p><strong>Investments:</strong></p>
                <ul className="list-disc pl-5">
                  {user.investments.map((investment, i) => (
                    <li key={i}>
                      {investment.selectedPackage} - ${investment.amount} ({investment.status})
                    </li>
                  ))}
                </ul>
                <p><strong>Agreed to Terms:</strong> {user.agreedToTerms ? "Yes" : "No"}</p>
              </div>
            </details>
          </div>
        ))}
      </Carousel>
    </div>

    <DeleteUser />
    </>
  )
}

export default AdminDashboard