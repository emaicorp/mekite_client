import React from "react";
import { motion } from "framer-motion";
import '../styles/Sponsor.css'

const Sponsors = () => {
  const sponsors = [
    { name: "FinNova Investment", image: "/sponsors/sponsor1.png" },
    { name: "CapitalTrust Bank", image: "/sponsors/sponsor2.png" },
    { name: "BlueSky Finance", image: "/sponsors/sponsor3.png" },
    { name: "WealthCore Partners", image: "/sponsors/sponsor4.png" },
    { name: "PrimeVest Capital", image: "/sponsors/sponsor5.png" },
    { name: "GlobalNet Holdings", image: "/sponsors/sponsor6.png" },
    { name: "SafeHaven Financials", image: "/sponsors/sponsor7.png" },
    { name: "Pinnacle Ventures", image: "/sponsors/sponsor8.png" },
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-400 text-lg">
            Partnering with the world's leading financial institutions
          </p>
        </motion.div>

        <div className="relative">
          {/* Gradient overlays for smooth scroll effect */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

          {/* Sponsors scroll container */}
          <div className="overflow-hidden relative w-full">
            <div className="flex space-x-12 animate-scroll">
              {/* First set of sponsors */}
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={`first-${index}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center justify-center min-w-[200px] px-6"
                >
                  <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                    <img
                      src={sponsor.image}
                      alt={sponsor.name}
                      className="h-12 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <p className="mt-4 text-gray-400 text-sm font-medium">
                    {sponsor.name}
                  </p>
                </motion.div>
              ))}
              
              {/* Duplicate set for infinite scroll */}
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={`second-${index}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center justify-center min-w-[200px] px-6"
                >
                  <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                    <img
                      src={sponsor.image}
                      alt={sponsor.name}
                      className="h-12 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <p className="mt-4 text-gray-400 text-sm font-medium">
                    {sponsor.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
