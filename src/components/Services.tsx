"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface Place {
  name: string;
  thumbnail: string;
  size: string;
  images: string[];
}

const places: Place[] = [
  {
    name: "Polonnaruwa",
    thumbnail: "/1.jpg",
    size: "medium",
    images: ["/polonnaruwa3.jpg", "/polonnaruwa2.jpg", "/polonnaruwa1.jpg"]
  },
  {
    name: "Mirissa",
    thumbnail: "/mirissa.jpg",
    size: "medium",
    images: ["/mirissa1.jpg", "/mirissa2.jpg", "/mirissa3.jpg"]
  },
  {
    name: "Kandy",
    thumbnail: "/kandy.jpg",
    size: "large",
    images: ["/kandy1.jpg", "/kandy2.jpg", "/kandy3.jpg"]
  },
  {
    name: "Matara",
    thumbnail: "/matara.jpg",
    size: "small",
    images: ["/matara1.jpg", "/matara2.jpg", "/matara3.jpg"]
  },
  {
    name: "Nuwara Eliya",
    thumbnail: "/nuwaraeliya.jpg",
    size: "medium",
    images: ["/nuwaraeliya1.jpg", "/nuwaraeliya2.jpg", "/nuwaraeliya3.jpg"]
  },

];

export default function Services() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const router = useRouter();

  const handleBookRide = () => {
    router.push("/booking");
  };

  return (
    <div className="bg-[url('/bck.avif')] bg-cover bg-center w-full">
      <div className="container mx-auto px-2 py-4"> {/* Reduced padding */}
      <div className="max-w-3xl mx-auto mt-5 p-1 text-black rounded-lg">
          <p className="text-4xl font-light">CHECK OUT WHAT WE OFFER!</p>
          <p className="text-center text-2xl md:text-2xl   mb-4">Tap to Book your Ride now</p>

        </div>
      
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1"> {/* Tightened grid gap */}
          {places.map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer ${
                place.size === 'large' ? 'row-span-2 col-span-2' : 'row-span-1'
              }`}
              onClick={() => setSelectedPlace(place)}
            >
              <Image
                src={place.thumbnail}
                alt={place.name}
                width={800}
                height={600}
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-white text-lg font-bold">{place.name}</h2>
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          className="block mx-auto mt-4 py-2 px-4 bg-custom-blue text-white rounded-md font-bold hover:text-custom-blue hover:bg-white transition mb-4"
          onClick={() => router.push('/services')}
        >
          See All Services
        </button>
      </div>

      {selectedPlace && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedPlace(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 my-8"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 p-6 pb-0">{selectedPlace.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
              {selectedPlace.images.map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-square">
                  <Image
                    src={img}
                    alt={`${selectedPlace.name} ${idx + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4 p-6">
              <button
                className="flex-1 py-2 px-4 bg-gray-300 rounded-lg font-medium"
                onClick={() => setSelectedPlace(null)}
              >
                Close
              </button>
              <button
                className="flex-1 py-2 px-4 bg-custom-blue text-white rounded-lg font-medium"
                onClick={handleBookRide}
              >
                Book a Ride Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}