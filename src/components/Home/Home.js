import React from 'react';
import Navbar from '../layout/Navbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import Features from './Features';
import CryptoChart from './CryptoChart';
import InvestmentPlans from './InvestmentPlans';
import Stats from './Stats';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import Sponsors from './Sponsors';
import Receive from './Receive';
import CryptoTicker from './CryptoTicker';
import RecentTransactions from './RecentTransactions';
// import MarketOverview from './MarketOverview';
import Footer from './Footer';

function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen">
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CryptoChart coinId="bitcoin" currency="usd" />
            <CryptoChart coinId="ethereum" currency="usd" />
          </div>
        </div>
      
      {/* <MarketOverview /> */}
      </div>
      <AboutSection />
      <Features />
      <CryptoTicker />
      <InvestmentPlans />
      <Stats />
      <Receive />
      <Testimonials />
      <RecentTransactions />
      <Sponsors />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default Home;
