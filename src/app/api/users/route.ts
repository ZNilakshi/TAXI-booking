import User from '@/models/User';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async () => {
  await connect();

  try {
    const users = await User.find().select('id name email role');
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: 'Error fetching users' }), { status: 500 });
  }
};
