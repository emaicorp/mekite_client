import React, { useState, useEffect } from "react";

const testimonials = [
    {
      name: "John Doe",
      text: "Investing in crypto has never been this simple and rewarding. I’ve doubled my portfolio in just three months!",
      country: "United States",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Alice Smith",
      text: "The platform’s real-time analytics and security features gave me the confidence to invest larger amounts. It’s been worth every dollar.",
      country: "Germany",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Hiroshi Tanaka",
      text: "I appreciate the transparency and ease of use. I’m making smart crypto investments without needing to be an expert.",
      country: "Japan",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Fatima Khan",
      text: "From beginner to investor in no time! The educational resources and support team have been invaluable.",
      country: "Pakistan",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Lucas Martin",
      text: "This platform is my go-to for crypto trading. The returns have been impressive, and the fees are fair.",
      country: "France",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Priya Sharma",
      text: "I started small, and now I’m seeing consistent growth. Their investment tools are fantastic for tracking performance.",
      country: "India",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "David Brown",
      text: "The safest crypto platform I’ve used so far. My investments are secure, and withdrawals are hassle-free.",
      country: "Canada",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "Ahmed Ali",
      text: "A truly innovative platform that simplifies crypto investing. My passive income has been growing steadily.",
      country: "United Arab Emirates",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      name: "Maria Gonzalez",
      text: "This site helped me diversify my investments effortlessly. I trust them completely with my crypto assets.",
      country: "Spain",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Kim Seong",
      text: "The user-friendly dashboard and real-time updates make it easy to manage my crypto portfolio. Highly recommended!",
      country: "South Korea",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Auto-slide functionality every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 20000); // 20 seconds
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 text-center">
        {/* Testimonial Image */}
        <img
          src={testimonials[currentIndex].image}
          alt={testimonials[currentIndex].name}
          className="w-20 h-20 mx-auto rounded-full mb-4 border-2 border-gray-300 shadow-sm"
        />
        {/* Testimonial Text */}
        <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">
          "{testimonials[currentIndex].text}"
        </p>
        {/* Testimonial Name */}
        <h3 className="font-semibold text-gray-900 text-xl">
          - {testimonials[currentIndex].name}
        </h3>
        <p className="text-gray-500 text-sm">{testimonials[currentIndex].country}</p>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
