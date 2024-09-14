import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    await client.connect();
    const database = client.db('yourDatabaseName');
    const messages = database.collection('messages');

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
  } finally {
    await client.close();
  }
}

export async function GET() {
  try {
    await client.connect();
    const database = client.db('yourDatabaseName');
    const messages = database.collection('messages');

    const allMessages = await messages.find({}).toArray();

    return NextResponse.json(allMessages, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch messages' }, { status: 500 });
  } finally {
    await client.close();
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
