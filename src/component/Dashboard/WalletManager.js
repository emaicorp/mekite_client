import React, { useState } from "react";
import Profile from "./Profile";
import WalletDetails from "./WalletDetails";

const WalletManager = () => {
  const [walletDetails, setWalletDetails] = useState(null);

  // Function to update wallet details
  const handleWalletUpdate = (data) => {
    setWalletDetails(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Wallet Management</h1>
      
      {/* Profile Component - Save/Fetch Wallet */}
      <Profile onWalletUpdate={handleWalletUpdate} />
      
      <hr className="my-8" />
      
      {/* WalletDetails Component - Display Wallet */}
      <WalletDetails walletDetails={walletDetails} />
    </div>
  );
};

export default WalletManager;
