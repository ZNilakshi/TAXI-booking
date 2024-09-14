// components/TestimonialCard.js
export default function TestimonialCard({ review }) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center max-w-md mx-auto">
        <img
          src={review.user.photo}
          alt={review.user.name}
          className="w-24 h-24 rounded-full border-4 border-teal-500 mb-4"
        />
        <h3 className="text-2xl font-semibold text-teal-600 mb-2">TESTIMONIAL</h3>
        <p className="text-gray-600 mb-4">{review.text}</p>
        <p className="text-gray-500 italic">- {review.user.name}, {review.country}</p>
        <div className="flex mt-4">
          {/* Display stars (you can dynamically generate this based on review rating) */}
          <span className="text-yellow-400">&#9733;</span>
          <span className="text-yellow-400">&#9733;</span>
          <span className="text-yellow-400">&#9733;</span>
          <span className="text-yellow-400">&#9733;</span>
          <span className="text-gray-300">&#9733;</span>
        </div>
      </div>
    );
  }
  