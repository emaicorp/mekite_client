import React from 'react';
import Navbar from '../../nav/Navbar';
import ContactSection from './ContactSection';

function ContactHeroSection() {
  return (
    <>
      <Navbar />
      <section className="relative bg-gradient-to-r from-black via-green-600 to-black flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="bg-black bg-opacity-80 text-white flex-1 flex items-center justify-center p-8">
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl mb-6">
              We would love to hear from you! Whether you have questions, feedback, or need support, our team is here to assist you. Feel free to reach out to us through any of the contact methods below, and we will respond as soon as possible.
            </p>
            <p className="text-base md:text-lg mt-6">
              Our customer service team is available to help you with any inquiries or concerns. You can contact us via email, phone, or by filling out our online form.
            </p>
            <p className="text-base md:text-lg mt-6">
              We look forward to connecting with you and assisting you in any way we can!
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="https://i.pinimg.com/236x/6b/bc/cb/6bbccb8db5a18d6b65e084617853a8d1.jpg" // Example image of customer support
            alt="Contact Us"
            className="object-cover h-[500px] w-[500px] rounded-full border-4 border-white"
          />
        </div>
      </section>

      <ContactSection />
    </>
  );
}

export default ContactHeroSection;
