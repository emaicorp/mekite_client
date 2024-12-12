import React from 'react';
import Navbar from '../../nav/Navbar';
import { Link } from 'react-router-dom'; // Corrected import path
import Stats from './Stats';

function Home() {
  return (
    <>
      <Navbar />
      <section className="relative bg-gradient-to-r from-black via-green-600 to-black text-white py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
  Unlock Your Investment Potential with  Bit<span className="text-yellow-500 italic">flux</span>capital
</h1>
<p className="text-lg md:text-xl">
<h1 className="text-1xl font-bold">
            Bit<span className="text-yellow-500 font-bold">flux</span>capital
            </h1> provides you with the easiest, safest, and fastest platform to invest in the most promising crypto assets.
</p>
            <Link to="/register" className="inline-block bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition-all mt-4">
              Register
            </Link>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <img
              alt="ball"
              src="https://softivuslab.com/html/critox/dist/assets/images/hero.png"
              className="w-6/4 md:w-1/2 h-auto animate-spin-slow"
            />
          </div>
        </div>
      </section>

      <Stats />
    </>
  );
}

export default Home;
