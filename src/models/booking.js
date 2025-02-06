import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  
  // Ride Details
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  dateTime: { type: Date, required: true },

  // Contact Details
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: { type: String, required: true },

  mobileNumber: { type: String, required: true },

  // Vehicle Selection
  selectedVehicle: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },

  // Payment Method
 

  // Timestamps
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
