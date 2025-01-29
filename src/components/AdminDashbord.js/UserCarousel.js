import React from 'react';
import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

function UserCarousel({ users }) {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1920 }, items: 5 },
    desktop: { breakpoint: { max: 1920, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <Carousel 
      responsive={responsive} 
      infinite 
      autoPlay 
      autoPlaySpeed={5000}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      className="py-4"
    >
      {users.map((user, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="mx-2"
        >
          <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500">
            <div className="bg-[#1a2234] rounded-xl p-4 h-full">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {user.fullName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-medium truncate">
                    {user.fullName}
                  </h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Balance:</span>
                  <span className="text-white">${user.totalEarnings}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className={`${user.isOnline ? 'text-green-400' : 'text-red-400'}`}>
                    {user.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </Carousel>
  );
}

export default UserCarousel;