
"use client"; 
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";



export default function About() {
  const [bgOpacity, setBgOpacity] = useState(1);
 
  




 
  

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1] transition-opacity duration-500"
        style={{
          backgroundImage: "url('/6.jpg')",
          filter: "blur(2px)",
          opacity: bgOpacity,
        }}
      ></div>
      <Navbar />
      <div className="relative w-full py-20 text-center text-white flex flex-col items-center">
      <div className="relative w-full h-screen  flex flex-col items-center justify-center text-center overflow-hidden">
  {/* Blurred background (only change) */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm -z-10"
    style={{ backgroundImage: "url('/6.jpg')" }}
  ></div>
  
  {/* Original content (unchanged) */}
  <h1 className="mt-40 text-7xl font-semibold text-blue">WHO WE ARE</h1>
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
      
   
<div className="container mx-auto px-4 sm:px-6 lg:px-5 py-10 md:py-24">
    <div className="max-w-4xl mx-auto">
      {/* Content Section */}
      <div className="w-full px-5 py-8 bg-white rounded-3xl shadow-2xl relative overflow-hidden">

        {/* Heading with decorative element */}
        <div className="mb-12 text-center relative z-10">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 font-semibold uppercase tracking-wider rounded-full text-sm mb-4">
            Our Journey
          </span>
         
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-6"></div>
        </div>

        {/* Main description */}
        <div className="prose prose-lg text-gray-700 mb-12 relative text-center max-w-3xl mx-auto">
          <p className="text-xl leading-relaxed">
            Since <strong className="text-blue-600 font-semibold">2020</strong>, DriveX has been redefining <strong className="text-blue-600 font-semibold">premium transportation </strong> 
            in  <strong className="text-blue-600 font-semibold">Ella, Sri Lanka</strong>. From humble beginnings as a local service, we've grown into the region's most trusted name for <span className="italic">safe, comfortable, and reliable</span> travel experiences.
          </p>
        </div>

        {/* Features with icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative ">
          {/* Fleet */}
          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 p-3 rounded-lg mr-4 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Premium Fleet</h3>
                <p className="text-gray-600">
                  Choose from our luxury executive cars, spacious KDH vans, and eco-friendly Toyota Prius vehicles - all meticulously maintained for your comfort and safety.
                </p>
              </div>
            </div>
          </div>

          {/* Service Area */}
          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 p-3 rounded-lg mr-4 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Expansive Coverage</h3>
                <p className="text-gray-600">
                  Based in Ella, we proudly serve Badulla, Bandarawela, and destinations across Sri Lanka with our team of professional, route-expert drivers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Client types in cards */}
        <div className="mb-12 relative ">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Who We Serve</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900">Tourists</h4>
              </div>
              <p className="text-gray-600 pl-14">
                Discover Sri Lanka's breathtaking landscapes with our knowledgeable drivers who double as local guides.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900">Business Professionals</h4>
              </div>
              <p className="text-gray-600 pl-14">
                Punctual, discreet service with WiFi-equipped vehicles for productive travel between meetings.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900">Families</h4>
              </div>
              <p className="text-gray-600 pl-14">
                Safe, comfortable rides with available child seats and extra space for luggage and strollers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900">Groups</h4>
              </div>
              <p className="text-gray-600 pl-14">
                Spacious vans for weddings, tours, and special events with customizable itineraries.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-2xl text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          
          <div className="relative  text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready for Your Journey?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Experience the AHANSA difference with our personalized service and competitive rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+94742291771" className="bg-white text-blue-600 hover:bg-gray-100 py-3 px-8 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  +94 742 291 771
                </span>
              </a>
              <a href="/booking" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 py-3 px-8 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book Online Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



  </div>

    
      <div>
        <Footer />
      </div>

    </>
  );

}
