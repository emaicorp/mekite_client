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
  { name: "Kim Seong", amount: "$7,200", country: "South Korea" },
  { name: "Victor Alvarez", amount: "$4,600", country: "Chile" },
  { name: "Laura Gomez", amount: "$2,100", country: "Colombia" },
  { name: "Tanaka Kazuya", amount: "$6,300", country: "Japan" },
  { name: "Emily Nguyen", amount: "$3,600", country: "Vietnam" },
  { name: "Hans Olsen", amount: "$4,400", country: "Denmark" },
  { name: "Hassan Ibrahim", amount: "$5,700", country: "Morocco" },
  { name: "Adriana Cruz", amount: "$2,700", country: "Peru" },
  { name: "Michael Carter", amount: "$6,800", country: "United States" },
  { name: "Priya Sharma", amount: "$3,500", country: "India" },
  { name: "Sami Al-Farsi", amount: "$4,900", country: "Oman" },
  { name: "Carlos Mendes", amount: "$3,400", country: "Brazil" },
  { name: "Amina Yusuf", amount: "$4,000", country: "Nigeria" },
  { name: "William Smith", amount: "$2,300", country: "Canada" },
  { name: "Elena Petrova", amount: "$7,800", country: "Russia" },
  { name: "Chen Li", amount: "$6,200", country: "China" },
  { name: "Stefan Müller", amount: "$5,100", country: "Germany" },
  { name: "Sarah Johnson", amount: "$3,300", country: "Australia" },
  { name: "Miguel Torres", amount: "$2,900", country: "Mexico" },
  { name: "Yuki Nakamura", amount: "$6,400", country: "Japan" },
  { name: "Nora Schmidt", amount: "$2,200", country: "Austria" },
  { name: "Ali Khan", amount: "$3,750", country: "Pakistan" },
  { name: "Sofia Rossi", amount: "$4,850", country: "Italy" },
  { name: "Ivan Popov", amount: "$5,400", country: "Ukraine" },
  { name: "Henry White", amount: "$3,150", country: "New Zealand" },
  { name: "Anwar Mahmoud", amount: "$2,450", country: "Egypt" },
  { name: "Isabella Fernandez", amount: "$5,900", country: "Argentina" },
  { name: "Oliver Smith", amount: "$4,100", country: "United Kingdom" },
  { name: "Nguyen Thanh", amount: "$3,700", country: "Vietnam" },
  { name: "Kim Woo-jin", amount: "$4,950", country: "South Korea" },
  { name: "Ahmet Yildiz", amount: "$3,800", country: "Turkey" },
  { name: "Mei Wong", amount: "$2,600", country: "Hong Kong" },
  { name: "Marco Bianchi", amount: "$7,100", country: "Italy" },
  { name: "Anita Singh", amount: "$6,350", country: "India" },
  { name: "Ethan Taylor", amount: "$5,750", country: "United States" },
  { name: "Linda Walker", amount: "$4,500", country: "Australia" },
  { name: "Rosa Hernandez", amount: "$3,200", country: "Mexico" },
  { name: "Omar Jaber", amount: "$6,100", country: "Saudi Arabia" },
  { name: "Nina Ivanova", amount: "$5,250", country: "Russia" },
  { name: "Chen Xi", amount: "$4,300", country: "Taiwan" },
  { name: "Samuel Green", amount: "$3,400", country: "South Africa" },
  { name: "Gabriel Silva", amount: "$6,700", country: "Brazil" },
  { name: "Thomas Laurent", amount: "$2,500", country: "France" },
  { name: "Carla Lopez", amount: "$7,600", country: "Spain" },
  { name: "Zainab Abdul", amount: "$4,000", country: "Nigeria" },
  { name: "Lukas Nielsen", amount: "$5,800", country: "Denmark" },
  { name: "Hannah Miller", amount: "$6,050", country: "United Kingdom" },
  { name: "Alex Wu", amount: "$3,900", country: "Singapore" },
  { name: "Fatima El-Sayed", amount: "$4,700", country: "Egypt" },
  { name: "Lucas Costa", amount: "$5,200", country: "Portugal" },
  { name: "Ahmad Hassan", amount: "$2,800", country: "Jordan" },
  { name: "Kofi Mensah", amount: "$6,900", country: "Ghana" },
  { name: "Emma Scott", amount: "$3,950", country: "United States" },
  { name: "Anna Müller", amount: "$5,300", country: "Germany" },
  { name: "Hiroshi Sato", amount: "$7,400", country: "Japan" },
  { name: "Kevin Lee", amount: "$4,600", country: "South Korea" },
  { name: "Maria Pereira", amount: "$3,250", country: "Brazil" },
  { name: "Stefan Ivanov", amount: "$2,750", country: "Bulgaria" },
  { name: "Priyanka Gupta", amount: "$5,100", country: "India" },
  { name: "James Brown", amount: "$6,300", country: "United States" },
  { name: "Nadia Petrova", amount: "$7,150", country: "Russia" },
  { name: "Mohammed Al-Farouq", amount: "$4,850", country: "Saudi Arabia" },
  { name: "Isabel Ruiz", amount: "$5,600", country: "Colombia" },
  { name: "Robert Kowalski", amount: "$4,200", country: "Poland" },
  { name: "Yasmine Aziz", amount: "$3,500", country: "Morocco" },
  { name: "Arjun Nair", amount: "$4,950", country: "India" },
  { name: "Chloe Jones", amount: "$3,450", country: "Australia" },
  { name: "Aliyah Khan", amount: "$2,900", country: "Pakistan" },
  { name: "Patrick Meyer", amount: "$5,400", country: "Germany" },
  { name: "Sofia Mendez", amount: "$6,000", country: "Argentina" },
];


function RecentTransactions() {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * transactions.length) // Start at a random index
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Start fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % transactions.length);
        setIsVisible(true); // Start fade-in
      }, 500); // Time for fade-out animation
    }, 60000); // Set interval to 1 minute

    return () => clearInterval(interval);
  }, []);

  const currentTransaction = transactions[currentIndex];

  return (
    <div
      className={`fixed bottom-4 left-4 p-4 rounded-lg shadow-2xl transition-all duration-500 ease-in-out w-80 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <p className="flex text-sm space-x-2 bg-white p-2 rounded-md">
        <span>{currentTransaction.name}</span>
        <span>just withdrew {currentTransaction.amount}</span>
      </p>
    </div>
  );
}

export default RecentTransactions;
