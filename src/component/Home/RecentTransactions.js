import React, { useEffect, useState } from "react";

const transactions = [
    { name: "John Doe", amount: "$5,000", country: "United States" },
    { name: "Alice Smith", amount: "$3,200", country: "Germany" },
    { name: "Hiroshi Tanaka", amount: "$7,500", country: "Japan" },
    { name: "Emily Clark", amount: "$2,000", country: "United Kingdom" },
    { name: "Liu Wei", amount: "$4,300", country: "China" },
    { name: "Lucas Martin", amount: "$6,800", country: "France" },
    { name: "Rajesh Kumar", amount: "$1,500", country: "India" },
    { name: "Maria Gonzalez", amount: "$2,700", country: "Spain" },
    { name: "David Brown", amount: "$5,600", country: "Canada" },
    { name: "Chen Yao", amount: "$3,900", country: "Singapore" },
    { name: "Ahmed Ali", amount: "$6,000", country: "United Arab Emirates" },
    { name: "Fatima Khan", amount: "$4,500", country: "Pakistan" },
    { name: "Pedro Silva", amount: "$3,800", country: "Brazil" },
    { name: "Anna Müller", amount: "$2,400", country: "Austria" },
    { name: "Kim Seong", amount: "$7,200", country: "South Korea" },
    { name: "Yusuf Adeyemi", amount: "$1,800", country: "Nigeria" },
    { name: "Sofia Rossi", amount: "$6,500", country: "Italy" },
    { name: "William Taylor", amount: "$2,300", country: "Australia" },
    { name: "Olga Ivanova", amount: "$5,100", country: "Russia" },
    { name: "Carlos Garcia", amount: "$4,000", country: "Mexico" },
    { name: "Mei Ling", amount: "$2,900", country: "Malaysia" },
    { name: "Samuel Johnson", amount: "$3,700", country: "New Zealand" },
    { name: "Isabella Lopez", amount: "$4,800", country: "Argentina" },
    { name: "Abdul Rahman", amount: "$5,400", country: "Saudi Arabia" },
    { name: "Chen Xia", amount: "$6,100", country: "Hong Kong" },
    { name: "Nora Berg", amount: "$1,700", country: "Norway" },
    { name: "Leonard Schmidt", amount: "$3,300", country: "Germany" },
    { name: "Aisha Bantu", amount: "$2,200", country: "South Africa" },
    { name: "Victor Alvarez", amount: "$4,600", country: "Chile" },
    { name: "Kunal Sharma", amount: "$2,500", country: "India" },
    { name: "Natasha Petrov", amount: "$5,900", country: "Ukraine" },
    { name: "Henry Lee", amount: "$3,400", country: "Singapore" },
    { name: "Sophia Kim", amount: "$6,700", country: "South Korea" },
    { name: "Jacob Scott", amount: "$2,600", country: "Ireland" },
    { name: "Ali Reza", amount: "$3,500", country: "Iran" },
    { name: "Angela Williams", amount: "$5,200", country: "United Kingdom" },
    { name: "Marco Costa", amount: "$4,100", country: "Portugal" },
    { name: "Ming Zhi", amount: "$3,100", country: "Taiwan" },
    { name: "Mohammed Salah", amount: "$7,000", country: "Egypt" },
    { name: "Elena Petrova", amount: "$2,800", country: "Bulgaria" },
    { name: "Omar Faruk", amount: "$3,000", country: "Bangladesh" },
    { name: "Laura Gomez", amount: "$2,100", country: "Colombia" },
    { name: "Tanaka Kazuya", amount: "$6,300", country: "Japan" },
    { name: "Emily Nguyen", amount: "$3,600", country: "Vietnam" },
    { name: "Hans Olsen", amount: "$4,400", country: "Denmark" },
    { name: "Hassan Ibrahim", amount: "$5,700", country: "Morocco" },
    { name: "Grace Chen", amount: "$6,200", country: "China" },
    { name: "Adriana Cruz", amount: "$2,700", country: "Peru" },
  ];

function RecentTransactions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Start fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % transactions.length);
        setIsVisible(true); // Start fade-in
      }, 500); // Time for fade-out animation
    }, 1000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTransaction = transactions[currentIndex];

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-2xl transition-all duration-500 ease-in-out w-80 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(29,78,216,1) 0%, rgba(37,99,235,1) 100%)",
      }}
    >
      <p className="text-lg font-bold mb-2 text-center text-white">
        🚀 Trusted Worldwide!
      </p>
      <p className="text-sm italic text-center mb-4 text-white">
        "Thousands of users across America, Europe, and Asia trust us with their
        financial transactions every day."
      </p>
      <div className="bg-white p-3 rounded-md text-gray-800 shadow-md">
        <p className="text-blue-600 text-lg font-semibold mb-2">
          Recent Withdrawal
        </p>
        <p className="mb-1">
          <span className="font-semibold">Name:</span> {currentTransaction.name}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Amount:</span>{" "}
          {currentTransaction.amount}
        </p>
        <p>
          <span className="font-semibold">Country:</span>{" "}
          {currentTransaction.country}
        </p>
      </div>
      <p className="text-sm mt-4 text-center font-light text-white">
        🔒 Your trust is our top priority. All transactions are secured.
      </p>
    </div>
  );
}

export default RecentTransactions;
