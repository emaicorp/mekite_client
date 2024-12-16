import React, { useState } from 'react';
import aboutvid from '../../vid/aboutVid.mp4'

function Us() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <section className="relative">
        {/* Video Section */}
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover" 
          autoPlay 
          loop 
          muted 
        >
          <source src={aboutvid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 py-16 px-8 bg-gradient-to-t from-black to-transparent">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-4xl font-semibold mb-6">About Us</h2>
            <p className="text-lg leading-relaxed mb-6">
              BitfluxCapital is a cutting-edge online investment platform built by a team of seasoned traders and cryptocurrency experts. Specializing in crypto trading across multiple exchanges and Bitcoin mining, our platform adds value through innovation and expertise.
              <br />
              Our company is rapidly growing, expanding its trading operations, enhancing mining techniques, and welcoming top-tier traders and miners to the team. At BitfluxCapital, we are dedicated to educating, securing, and empowering individuals worldwide to capitalize on the opportunities within the cryptocurrency industry.
              <br />
              {isExpanded ? (
                <>
                  Join us today and start earning passive income effortlessly by leveraging our proven expertise in Bitcoin mining and crypto trading. We continue to expand globally and ensure security, transparency, and profitability for all our users.
                </>
              ) : (
                <span>
                  Join us today and start earning passive income effortlessly by leveraging our proven expertise in Bitcoin mining and crypto trading...
                </span>
              )}
            </p>
            <button 
              onClick={toggleReadMore} 
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition duration-300"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-gray-100">
        <div className="container mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              BitfluxCapital is a cutting-edge online investment platform, powered by a team of seasoned traders and cryptocurrency experts. We specialize in crypto trading across multiple exchanges and Bitcoin mining, bringing innovation and expertise to every transaction.
              <br />
              As a rapidly growing company, we're expanding our trading operations, refining our mining techniques, and attracting top-tier traders and miners to join our team. At BitfluxCapital, we are committed to educating, securing, and empowering individuals worldwide, enabling them to take full advantage of the opportunities within the cryptocurrency market.
              <br />
              Join us today and start earning passive income effortlessly, backed by our proven expertise in Bitcoin mining and crypto trading.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              At BitfluxCapital, we are dedicated to delivering exceptional services to our clients. To achieve this, we continuously expand our technical capabilities and financial performance, leveraging the power of ASIC miners. Our hands-on experience ensures profitable outcomes through efficient cryptocurrency generation.
              <br />
              BitfluxCapital envisions broadening the pool of investors by employing strategic mining and trading techniques, allowing us to unlock greater potential in the ever-evolving cryptocurrency market.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Us;
