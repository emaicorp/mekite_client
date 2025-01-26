import React from 'react';
import Navbar from '../layout/Navbar';
import HeroSection from './HeroSection';
import Features from './Features';
import CryptoChart from './CryptoChart';
import InvestmentPlans from './InvestmentPlans';
import Stats from './Stats';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import Sponsors from './Sponsors';
import Receive from './Receive';

function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <div className="container mx-auto px-4 py-16 flex gap-3 justify-between items-center">
        <CryptoChart coinId="bitcoin" currency="usd" />
        <CryptoChart coinId="ethereum" currency="usd" />
      </div>
      <InvestmentPlans />
      <Stats />
      <Receive />
      <Testimonials />
      <Sponsors />
      <CallToAction />
    </div>
  );
}

export default Home;
