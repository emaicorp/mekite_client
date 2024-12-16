import React from "react";
import '../styles/Sponsor.css'
import TestimonialCarousel from "./TestimonialCarousel";
const Sponsors = () => {
  const sponsors = [
    { name: "FinNova Investment", image: "https://lenoxcoins.com/img/clients-logo-06.png" },
    { name: "CapitalTrust Bank", image: "https://lenoxcoins.com/img/clients-logo-04.png" },
    { name: "BlueSky Finance", image: "https://lenoxcoins.com/img/clients-logo-03.png" },
    { name: "WealthCore Partners", image: "https://lenoxcoins.com/img/clients-logo-02.png" },
    { name: "PrimeVest Capital", image: "https://lenoxcoins.com/img/clients-logo-01.png" },
    { name: "GlobalNet Holdings", image: "https://lenoxcoins.com/img/clients-logo-08.png" },
    { name: "SafeHaven Financials", image: "https://lenoxcoins.com/img/clients-logo-07.png" },
    { name: "Pinnacle Ventures", image: "https://lenoxcoins.com/img/clients-logo-05.png" },
    { name: "CrestFunds Group", image: "https://lenoxcoins.com/img/clients-logo-04.png" },
    { name: "FortuneEdge Finance", image: "https://lenoxcoins.com/img/clients-logo-03.png" },

  ];

  return (
   <>
     <section className="py-8 bg-white">
      <h2 className="text-center text-3xl font-bold text-black mb-6">
        Our Sponsors
      </h2>
      <div className="overflow-hidden relative w-full">
        <div className="flex space-x-8 animate-scroll">
          {sponsors.concat(sponsors).map((sponsor, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[200px]"
            >
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="h-5 w-12 object-contain"
              />
              <p className="text-black text-lg font-bold italic">{sponsor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <TestimonialCarousel />
    </div>
   </>
  );
};

export default Sponsors;
