import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Navbar from "../../nav/Navbar";
import CryptoPopularity from "./CryptoPopularity";
import Steady from "./Steady";

function AboutHeroSection() {
  return (
    <>
      <Navbar />

      {/* Hero Section with Carousel */}
      <section className="relative h-[90vh] w-full">
        {/* Swiper Carousel */}
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="https://i.pinimg.com/236x/68/30/2b/68302bf784a136424d1d6c5322273b9d.jpg"
                alt="Crypto Future"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-8">
                <div className="text-white text-center md:text-left max-w-4xl">
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                    Revolutionizing Digital Finance
                  </h1>
                  <p className="text-lg md:text-2xl mb-6">
                    Unlock new possibilities with secure, decentralized, and transparent cryptocurrency solutions. Empowering everyone, from enthusiasts to beginners, in building financial independence.
                  </p>
                  <button className="mt-4 bg-green-500 text-black px-6 py-3 font-semibold rounded-lg hover:bg-green-600 transition duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="https://i.pinimg.com/474x/6b/2f/6f/6b2f6f55caf400cdafb1cecffef902ba.jpg"
                alt="Blockchain Innovation"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-8">
                <div className="text-white text-center md:text-left max-w-4xl">
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                    Leading Blockchain Innovation
                  </h1>
                  <p className="text-lg md:text-2xl mb-6">
                    Experience unparalleled speed, security, and reliability as we shape the future of blockchain technology for the digital age.
                  </p>
                  <button className="mt-4 bg-green-500 text-black px-6 py-3 font-semibold rounded-lg hover:bg-green-600 transition duration-300">
                    Discover More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="https://i.pinimg.com/474x/2a/c2/c0/2ac2c09bcc08b4ccd1b7c6f0db0839bc.jpg"
                alt="Financial Freedom"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-8">
                <div className="text-white text-center md:text-left max-w-4xl">
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                    Financial Freedom, Redefined
                  </h1>
                  <p className="text-lg md:text-2xl mb-6">
                    Join us in democratizing access to financial tools. Build your wealth with cutting-edge cryptocurrency and blockchain solutions.
                  </p>
                  <button className="mt-4 bg-green-500 text-black px-6 py-3 font-semibold rounded-lg hover:bg-green-600 transition duration-300">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <Steady />
      {/* Crypto Popularity Section */}
      <CryptoPopularity />
    </>
  );
}

export default AboutHeroSection;
