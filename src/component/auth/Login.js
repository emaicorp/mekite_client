import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // For success message
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post("https://mekite-crypto.onrender.com/api/users/login", formData);
      const { token, user } = response.data;

      // Store token and user details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Set success message
      setSuccess("Login successful! Redirecting to dashboard...");

      // Navigate to dashboard with user data
      setTimeout(() => navigate("/dashboard", { state: { user } }), 1000);
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {/* Error message */}
        {error && <div className="text-red-500 mb-3">{error}</div>}

        {/* Success message */}
        {success && <div className="text-green-500 mb-3">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          /> */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className={`w-full p-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Create Account Option */}
        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline"
          >
            Create one here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
