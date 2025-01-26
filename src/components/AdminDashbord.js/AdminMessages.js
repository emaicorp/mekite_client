import React, { useEffect, useState } from "react";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  // Fetch messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("https://mekite-crypto.onrender.com/api/messages");
        if (!response.ok) {
          throw new Error("Failed to fetch messages.");
        }

        const data = await response.json();
        setMessages(data.messages); // Assuming backend returns { messages: [...] }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMessages();
  }, []);

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">User Messages</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="bg-white shadow-lg rounded-lg p-6">
          {messages.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 text-left">First Name</th>
                  <th className="py-2 px-4 text-left">Last Name</th>
                  <th className="py-2 px-4 text-left">Phone</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{msg.firstName}</td>
                    <td className="py-2 px-4">{msg.lastName}</td>
                    <td className="py-2 px-4">{msg.phone}</td>
                    <td className="py-2 px-4">{msg.email}</td>
                    <td className="py-2 px-4">{msg.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No messages available.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminMessages;
