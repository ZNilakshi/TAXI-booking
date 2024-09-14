import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    email: String,
    name: String,
    photo: String,
  },
  text: String,
  country: String, // Add country field
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
