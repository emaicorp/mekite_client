import React from 'react';
import Navbar from '../../nav/Navbar';
import ContactSection from './ContactSection';

function ContactHeroSection() {
  return (
    <>
      <Navbar />
      <section className="relative bg-black flex items-center justify-center py-16 px-4">
        {/* Image Section with Text Overlay */}
        <div className="relative w-full h-[500px] md:h-[700px]">
          <img
            src="https://i.pinimg.com/236x/bc/fe/4d/bcfe4d8c73f3da39e076408f86f249d7.jpg" // Crypto-style image
            alt="Contact Us"
            className="object-cover w-full h-full rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-20 p-4 rounded-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">Contact Us</h1>
            <p className="text-lg md:text-xl text-white text-center max-w-md mb-6">
              Have questions or need support? We're here for you. Reach out to us through any of the contact methods below.
            </p>
            <p className="text-base md:text-lg text-white text-center max-w-md mt-4">
              Our customer service team is available for inquiries. Feel free to contact us via email, phone, or through our online form.
            </p>
            <p className="text-base md:text-lg text-white text-center max-w-md mt-4">
              We look forward to connecting with you and assisting you with any queries you may have!
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}

export default ContactHeroSection;
