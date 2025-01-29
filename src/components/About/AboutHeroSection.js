import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Navbar from "../layout/Navbar";
import CryptoPopularity from "./CryptoPopularity";
import Steady from "./Steady";
import CryptoPrices from "../Home/CryptoPrices";
import { motion } from "framer-motion";
import { RiRocketLine, RiShieldLine, RiLockLine } from "react-icons/ri";

function AboutHeroSection() {
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80",
      title: "Next Generation of Digital Finance",
      description: "Experience the future of investment with our advanced crypto trading platform.",
      icon: RiRocketLine,
    },
    {
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80",
      title: "Secure & Reliable Platform",
      description: "Your investments are protected by state-of-the-art security measures.",
      icon: RiShieldLine,
    },
    {
      image: "https://images.unsplash.com/photo-1639762681286-36f0d87a6ae4?auto=format&fit=crop&q=80",
      title: "Advanced Trading Solutions",
      description: "Access sophisticated trading tools and real-time market analytics.",
      icon: RiLockLine,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#111827]">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={1000}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="absolute inset-0"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-screen">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/90 via-[#111827]/70 to-[#111827]" />
                
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover w-full h-full"
                />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <div className="max-w-6xl mx-auto w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-center space-y-8"
                    >
                      {/* Icon */}
                      <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                        <slide.icon className="text-4xl sm:text-5xl text-indigo-400" />
                      </div>

                      {/* Title */}
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative group"
                        >
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200" />
                          <button className="relative px-8 py-3 bg-[#1a2234] rounded-xl text-white font-medium group-hover:bg-[#1f2943] transition-all">
                            Get Started
                          </button>
                        </motion.div>
                        
                        <button className="px-8 py-3 text-gray-300 hover:text-white transition-colors">
                          Learn More
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center p-2"
          >
            <motion.div className="w-1 h-1 rounded-full bg-gray-500" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="relative z-10 -mt-32 pb-12  bg-gray-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
            <div className="bg-[#1a2234] rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">$5B+</div>
                  <div className="text-gray-400">Trading Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">150+</div>
                  <div className="text-gray-400">Countries Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">1M+</div>
                  <div className="text-gray-400">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CryptoPrices />
      <Steady />
      <CryptoPopularity />
    </>
  );
}

export default AboutHeroSection;
