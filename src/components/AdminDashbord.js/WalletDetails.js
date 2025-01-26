import React, { useState } from "react";

function WalletDetails() {
  const [email, setEmail] = useState("");
  const [walletDetails, setWalletDetails] = useState(null);
  const [error, setError] = useState("");

  const handleFetchWallet = async () => {
    setError("");
    setWalletDetails(null);

    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        `https://mekite-btc.onrender.com/api/users/api/wallets?email=${encodeURIComponent(email)}`
      );

      const data = await response.json();

      if (response.ok) {
        setWalletDetails(data.data);
      } else {
        setError(data.message || "Failed to fetch wallet details.");
      }
    } catch (err) {
      console.error("Error fetching wallet details:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6">Fetch Wallet Details</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Enter User Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <button
        onClick={handleFetchWallet}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
      >
        Fetch Wallet
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {walletDetails && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Wallet Details</h3>
          <p>
            <strong>Email:</strong> {walletDetails.email}
          </p>
          <p>
            <strong>Bitcoin Address:</strong> {walletDetails.bitcoinAddress}
          </p>
          <p>
            <strong>Ethereum Address:</strong> {walletDetails.ethereumAddress}
          </p>
          <p>
            <strong>USDT Address:</strong> {walletDetails.usdtAddress}
          </p>
        </div>
      )}
    </div>
  );
}

export default WalletDetails;
