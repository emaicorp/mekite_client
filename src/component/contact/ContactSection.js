import React from 'react';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Icons for phone, email, and map
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'; // Chat icon
import GetInTouch from './GetInTouch';

function ContactSection() {
  return (
   <>
     <section className="bg-black py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Chat Support Container */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <div className="flex items-center space-x-4 mb-4">
              <IoChatbubbleEllipsesOutline size={30} className="text-blue-500" />
              <h3 className="text-xl font-semibold">Chat to Support</h3>
            </div>
            <p className="text-gray-700 mb-4">Speak to our friendly team for instant support.</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300">
              Start Chat
            </button>
          </div>

          {/* Email Support Container */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <div className="flex items-center space-x-4 mb-4">
              <FaEnvelope size={30} className="text-yellow-500" />
              <h3 className="text-xl font-semibold">Email Us</h3>
            </div>
            <p className="text-gray-700 mb-4">Have a question? Email us at support@example.com</p>
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
              Send Email
            </a>
          </div>

          {/* Visit Us Container */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <div className="flex items-center space-x-4 mb-4">
              <FaMapMarkerAlt size={30} className="text-green-500" />
              <h3 className="text-xl font-semibold">Visit Us</h3>
            </div>
            <p className="text-gray-700 mb-4">Our office is located in the heart of Australia. Come visit us!</p>
            <a
              href="https://www.google.com/maps?q=Australia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View on Google Maps
            </a>
          </div>
        </div>

        {/* Contact Hours */}
        <div className="text-center mt-12">
          <p className="text-lg text-white">Contact Us: Mon-Fri from 8am to 5pm</p>
          <p className="text-lg text-white mt-4">(239) 555-0108</p>
        </div>

        {/* Map Section */}
        <div className="mt-16">
  <h3 className="text-2xl font-bold text-center text-black mb-4">Our Location</h3>
  <div className="w-full h-[400px]">
    <iframe
      title="Australia Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13222.523593008153!2d151.2071148!3d-33.8688199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae2f98cfd9b7%3A0x5b3f733c1baf62d4!2sSydney%2C%20Australia!5e0!3m2!1sen!2sau!4v1692569461728!5m2!1sen!2sau"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

      </div>
    </section>
    <GetInTouch />
   </>
  );
}

export default ContactSection;
