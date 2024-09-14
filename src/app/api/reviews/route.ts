import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;
let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function POST(request) {
  try {
    const { user, text, country } = await request.json();

    await clientPromise;
    const database = client.db('reviews');
    const reviews = database.collection('reviews');

    const newReview = {
      user,
      text,
      country,
      createdAt: new Date(),
    };

    await reviews.insertOne(newReview);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ success: false, message: 'Failed to add review' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await clientPromise;
    const database = client.db('reviews');
    const reviews = database.collection('reviews');

    const allReviews = await reviews.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(allReviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch reviews' }, { status: 500 });
  }
}
