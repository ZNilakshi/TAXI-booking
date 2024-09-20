import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;

if (!uri) {
  throw new Error("MONGO_URL is not defined in the environment variables");
}

const client = new MongoClient(uri);
let clientPromise: Promise<MongoClient> | null = null;

async function connectToDatabase() {
  if (!clientPromise) {
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Ensure required fields are present
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Connect to the database
    const client = await connectToDatabase();
    const database = client.db('yourDatabaseName');
    const messages = database.collection('messages');

    // Insert the new message
    const newMessage = {
      name,
      email,
      message,
      createdAt: new Date(),
    };
    await messages.insertOne(newMessage);

    return NextResponse.json({ success: true, message: 'Message saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ success: false, message: 'Failed to save message' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const database = client.db('yourDatabaseName');
    const messages = database.collection('messages');

    // Fetch all messages
    const allMessages = await messages.find({}).toArray();

    return NextResponse.json(allMessages, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch messages' }, { status: 500 });
  }
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'OPTIONS, GET, POST',
    },
  });
}
