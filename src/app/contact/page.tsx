"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCar, FaShieldAlt, FaGlobe, FaUserTie, FaUsers, FaChild, FaBus } from 'react-icons/fa';
import { motion } from "framer-motion";

export default function AboutContactPage() {
  const [bgOpacity] = useState(1);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm -z-10"
            style={{ backgroundImage: "url('/6.jpg')" }}
          ></div>
          
          <h1 className="mt-40 text-7xl font-semibold text-custom-blue">WHO WE ARE</h1>
          <h2 className="mt-10 text-3xl font-light">Premium transportation services in Ella, Sri Lanka since 2020</h2>

          <div className="flex flex-col sm:flex-row gap-5 mt-10 mb-20 py-4 px-10 items-center sm:items-start">
            <button
              className="bg-custom-blue text-white py-4 px-10 text-lg hover:bg-white hover:text-black w-full sm:w-auto"
              onClick={() => window.location.href = '/booking'}
            >
              Book a Ride
            </button>
            <button
              className="bg-white text-black py-4 px-12 text-lg hover:bg-custom-blue hover:text-white w-full sm:w-auto"
              onClick={() => window.location.href = 'tel:+94742291771'}
            >
              Call Us
            </button>
          </div>
      </div>

      {/* About Section */}
      <div className="bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}></motion.div>

            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Redefining Transportation in Sri Lanka
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1 bg-custom-blue mx-auto mb-8 rounded-full"></motion.div>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-4xl mx-auto">
              Since 2020, DriveX has been setting new standards for premium transportation in Ella and beyond. 
              What began as a local service has grown into the region's most trusted name for safe, comfortable, 
              and reliable travel experiences.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-custom-blue/10 to-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-custom-blue p-4 rounded-xl text-white mr-6">
                  <FaCar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Premium Fleet</h3>
                  <p className="text-gray-600">
                    Choose from our luxury executive cars, spacious KDH vans, and eco-friendly Toyota Prius vehicles - 
                    all meticulously maintained for your comfort and safety.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-custom-blue/10 to-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-custom-blue p-4 rounded-xl text-white mr-6">
                  <FaGlobe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Expansive Coverage</h3>
                  <p className="text-gray-600">
                    Based in Ella, we proudly serve Badulla, Bandarawela, and destinations across Sri Lanka with our 
                    team of professional, route-expert drivers.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Who We Serve Section */}
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}></motion.div>

            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Serve
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1 bg-custom-blue mx-auto mb-8 rounded-full"></motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaUsers className="h-8 w-8" />,
                title: "Tourists",
                description: "Discover Sri Lanka's breathtaking landscapes with our knowledgeable drivers who double as local guides."
              },
              {
                icon: <FaUserTie className="h-8 w-8" />,
                title: "Business Professionals",
                description: "Punctual, discreet service with WiFi-equipped vehicles for productive travel between meetings."
              },
              {
                icon: <FaChild className="h-8 w-8" />,
                title: "Families",
                description: "Safe, comfortable rides with available child seats and extra space for luggage and strollers."
              },
              {
                icon: <FaBus className="h-8 w-8" />,
                title: "Groups",
                description: "Spacious vans for weddings, tours, and special events with customizable itineraries."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="bg-custom-blue/20 p-4 rounded-full w-16 h-16 flex items-center justify-center text-custom-blue mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-b from-white to-custom-blue/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="md:flex">
              {/* Contact Form Side */}
              <div className="md:w-1/2 p-10 bg-custom-blue to-custom-blue-dark text-white">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  variants={staggerContainer}
                  viewport={{ once: true }}
                >
                  <motion.div variants={fadeInUp}>
                    <span className="inline-block px-4 py-2 bg-white/20 text-white font-semibold rounded-full text-sm mb-4 tracking-wider">
                      GET IN TOUCH
                    </span>
                  </motion.div>
                  <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-6">
                    Contact Us
                  </motion.h2>
                  <motion.div variants={fadeInUp} className="w-20 h-1 bg-white/50 mb-8 rounded-full"></motion.div>
                  <motion.p variants={fadeInUp} className="text-lg mb-8 opacity-90">
                    Have questions or need to book a ride? Reach out to us and our team will get back to you promptly.
                  </motion.p>

                  <motion.div variants={fadeInUp} className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg">
                        <FaEnvelope className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium opacity-80">Email</h3>
                        <a href="mailto:drivextravel@gmail.com" className="text-lg font-medium hover:underline">
                          drivextravel@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg">
                        <FaPhone className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium opacity-80">Phone</h3>
                        <a href="tel:+94742291771" className="text-lg font-medium hover:underline">
                          +94 742 291 771
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg">
                        <FaMapMarkerAlt className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium opacity-80">Headquarters</h3>
                        <p className="text-lg font-medium">Reg No = W/1440, Ella, Sri Lanka</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

          {/* Photo Side */}
<div className="md:w-1/2 p-10">
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="h-full flex flex-col"
  >
       <div className="bg-gray-100 rounded-xl overflow-hidden flex-grow h-96">
      <img 
        src="/air.webp" // Replace with your actual image path
        alt="DriveX Headquarters in Ella, Sri Lanka"
        className="w-full h-full object-cover"
      />
    </div>
    
  </motion.div>
</div>
            </div>
          </div>
        </div>
      </div>

     

      <Footer />
    </>
  );
}
