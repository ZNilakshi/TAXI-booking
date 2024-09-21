import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Ensure type safety for MongoClient
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGO_URL;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function POST(request: Request) {
  try {
    const { user, text, country } = await request.json();

    // Wait for the MongoDB client to connect
    await clientPromise;
    const database = client.db('reviews');
    const reviews = database.collection('reviews');

    // Create a new review object
    const newReview = {
      user,
      text,
      country,
      createdAt: new Date(),
    };

    // Insert the new review into the database
    await reviews.insertOne(newReview);

    // Return the newly created review with a 201 status
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ success: false, message: 'Failed to add review' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Wait for the MongoDB client to connect
    await clientPromise;
    const database = client.db('reviews');
    const reviews = database.collection('reviews');

    // Fetch all reviews, sorted by the newest first
    const allReviews = await reviews.find({}).sort({ createdAt: -1 }).toArray();

    // Return the reviews with a 200 status
    return NextResponse.json(allReviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch reviews' }, { status: 500 });
  }
}
