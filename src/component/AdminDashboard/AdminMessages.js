import React, { useState, useEffect } from "react";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");  // Holds the admin's response
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    // Fetch all messages for admin
    const fetchMessages = async () => {
      try {
        const res = await fetch("https://mekite-crypto.onrender.com/api/messages/admin/messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, []);

  // Handle response submission
  const handleRespond = async () => {
    if (!response) {
      alert("Please enter a response message.");
      return;
    }

    try {
      // Send the admin's response to the backend
      const res = await fetch(`https://mekite-crypto.onrender.com/api/messages/admin/respond/${selectedMessage._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ response })  // Send the response to backend
      });

      const data = await res.json();
      if (res.status === 200) {
        alert("Response sent successfully.");
        setResponse("");  // Clear the response field
        setSelectedMessage(null);  // Deselect the message
        // Refresh messages after sending the response
        const updatedMessages = await fetch("https://mekite-crypto.onrender.com/api/messages/admin/messages").then(res => res.json());
        setMessages(updatedMessages);
      } else {
        alert(data.error || "Failed to send response.");
      }
    } catch (err) {
      console.error("Error responding:", err);
    }
  };

  return (
    <div>
      <h1>Admin Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <h3>{message.firstName} {message.lastName}</h3>
            <p>{message.message}</p>
            <button onClick={() => setSelectedMessage(message)}>
              Reply
            </button>
          </li>
        ))}
      </ul>

      {selectedMessage && (
        <div>
          <h2>Reply to: {selectedMessage.firstName} {selectedMessage.lastName}</h2>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}  // Update response state
            placeholder="Write your response..."
          ></textarea>
          <button onClick={handleRespond}>Send Response</button>
        </div>
      )}
    </div>
  );
}

export default AdminMessages;
