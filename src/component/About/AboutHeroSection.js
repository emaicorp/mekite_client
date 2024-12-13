import React from 'react';
import Navbar from '../../nav/Navbar';
import CryptoPopularity from './CryptoPopularity';

function AboutHeroSection() {
  return (
    <>
      <Navbar />
      <section className="relative bg-gradient-to-r from-black via-green-600 to-black flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="bg-black bg-opacity-80 text-white flex-1 flex items-center justify-center p-8">
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-lg md:text-xl mb-6">
              Welcome to the future of finance! We are pioneering the world of cryptocurrency, providing secure, decentralized, and transparent solutions for digital assets. Our mission is to empower individuals by offering a financial ecosystem that is fast, reliable, and accessible to everyone.
            </p>
            <p className="text-base md:text-lg">
              At the core of our vision is the belief that cryptocurrency can revolutionize the way we interact with money, breaking down barriers and opening doors to new opportunities. Our team is dedicated to building innovative solutions that enable financial freedom, while ensuring privacy and security through cutting-edge blockchain technology.
            </p>
            <p className="text-base md:text-lg mt-6">
              Join us as we lead the charge in shaping the future of digital finance. Whether you're a seasoned crypto enthusiast or just getting started, we are here to guide you through the exciting world of cryptocurrencies.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="https://i.pinimg.com/236x/40/6a/26/406a26aa9d07c0404761b6b7e39d2bc4.jpg"
            alt="_breadcrumb"
            className="object-cover h-[500px] w-[500px] rounded-full border-4 border-white"
          />
        </div>
      </section>

      <CryptoPopularity />
    </>
  );
}

export default AboutHeroSection;
