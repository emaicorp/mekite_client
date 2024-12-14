import React from 'react'
import { ImSteam2 } from "react-icons/im";
import { SiAurelia } from "react-icons/si";
import { CiMaximize1 } from "react-icons/ci";
import Us from './Us';

function Steady() {
  return (
    <>
        <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Why Choose Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-green-500 text-6xl mb-4 flex justify-center">
              <ImSteam2 />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Measured Progress
            </h2>
            <p className="text-gray-600">
              BitfluxCapital is a secure and reliable platform that guarantees
              consistent growth on your investments. Enjoy daily returns
              effortlessly, with instant payouts and a hassle-free experience.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-blue-500 text-6xl mb-4 flex justify-center">
              <SiAurelia />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Continuous Development
            </h2>
            <p className="text-gray-600">
              BitfluxCapital is supported by a team of seasoned professionals,
              market experts, and trading specialists, offering 24/7 guidance
              and support to ensure a dependable and trustworthy system for
              users.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-yellow-500 text-6xl mb-4 flex justify-center">
              <CiMaximize1 />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Gradual Success
            </h2>
            <p className="text-gray-600">
              BitfluxCapital utilizes cutting-edge monitoring technology
              combined with expert precision to deliver secure and efficient
              returns on your investments, ensuring optimal performance and
              reliability.
            </p>
          </div>
        </div>
      </div>
    </section>

    <Us />
    </>
  )
}

export default Steady