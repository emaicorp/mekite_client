import React from 'react';
import { Link } from 'react-router-dom';
import Stats from './Stats';
import homevid from '../../vid/homevid.mp4'
import Navbar from '../../nav/Navbar';

function Home() {
  return (
    <>
    <Navbar />
      <section className="relative w-full h-screen bg-white text-black">
        {/* Video Background */}
        <div className="relative h-full">
          <video
            className="w-full h-full object-cover"
            src={homevid} // Replace this with the actual video path
            autoPlay
            loop
            muted
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="max-w-4xl text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Journey to Financial Growth Starts with <span className="text-yellow-500 italic">BitfluxCapital</span>
              </h1>
              <p className="text-lg md:text-2xl mt-6">
                Explore secure, intuitive, and high-yield investment opportunities with ease.
              </p>
              <Link
                to="/register"
                className="inline-block bg-yellow-500 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-600 transition-all mt-8"
              >
                Join Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Stats />
    </>
  );
}

export default Home;
