import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    quote: "The AI-powered trading strategies have completely transformed my investment portfolio. The returns are incredible!",
    author: "Sarah Johnson",
    position: "Professional Investor",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    quote: "The platform's security features and real-time analytics give me peace of mind while trading.",
    author: "Michael Chen",
    position: "Crypto Enthusiast",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    quote: "Best investment decision I've made. The customer support is exceptional and the returns are consistent.",
    author: "Emma Thompson",
    position: "Business Owner",
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  }
];

function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            What Our Investors Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied investors who have already discovered the power of AI-driven trading
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-2xl backdrop-blur-lg p-8 relative"
            >
              <FaQuoteLeft className="text-3xl text-blue-500 mb-4" />
              <p className="text-gray-300 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-gray-400">{testimonial.position}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials; 