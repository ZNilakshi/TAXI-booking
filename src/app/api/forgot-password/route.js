// src/app/api/forgot-password/route.js

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: 'Here is your password reset link: [LINK]',
    };

    await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${email}`);

    return NextResponse.json({ message: 'Password reset link sent. Please check your email.' });
  } catch (error) {
    console.error('Error in forgot-password route:', error.message);
    return NextResponse.json({ message: 'An error occurred while sending reset link' }, { status: 500 });
  }
}
