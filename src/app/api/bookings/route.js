import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';
import dayjs from 'dayjs';

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false, // Use true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const formatDateTime = (dateTime) => {
  return dateTime ? dayjs(dateTime).format('YYYY-MM-DD HH:mm') : 'N/A';
};

const formatBookingSummaryText = (formData) => {
  return `
Booking Summary:
-----------------------
Booking ID: ${formData.bookingId || 'N/A'}

Ride Details:
  Pickup Location: ${formData.pickupLocation || 'N/A'}
  Dropoff Location: ${formData.dropLocation || 'N/A'}
  Pickup Date & Time: ${formatDateTime(formData.dateTime)}

Contact Details:
  First Name: ${formData.firstName || 'N/A'}
  Last Name: ${formData.lastName || 'N/A'}
  Title: ${formData.title || 'N/A'}
  Email: ${formData.email || 'N/A'}
  ID Number: ${formData.idNumber || 'N/A'}
  Mobile Number: ${formData.mobileNumber || 'N/A'}

Vehicle Selection:
  Vehicle: ${formData.selectedVehicle?.name || 'N/A'}
  Vehicle Price: $${formData.vehiclePrice?.toFixed(2) || 'N/A'}

Payment Method:
  ${formData.paymentMethod || 'N/A'}
  `;
};

// POST request handler
export async function POST(request) {
  try {
    const formData = await request.json();

    // Validate essential fields
    if (!formData.email || !formData.firstName) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    await client.connect();
    const database = client.db('bookings');
    const bookings = database.collection('bookings');

    const newBooking = {
      ...formData,
      createdAt: new Date(),
    };

    await bookings.insertOne(newBooking);

    // Prepare booking summary text
    const bookingSummary = formatBookingSummaryText(formData);

    // Send confirmation email with booking summary
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: formData.email,
      subject: 'Booking Confirmation',
      text: `Dear ${formData.firstName},\n\nThank you for your booking. Here are your booking details:\n\n${bookingSummary}\n\nWe look forward to serving you!\n\nBest regards,\nYour Company`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Booking saved and confirmation email sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving booking:', error);
    return NextResponse.json({ success: false, message: 'Failed to save booking or send confirmation email' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// GET request handler
export async function GET() {
  try {
    await client.connect();
    const database = client.db('bookings');
    const bookings = database.collection('bookings');

    const results = await bookings.find({}).toArray(); // Fetch all bookings

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch bookings' }, { status: 500 });
  } finally {
    await client.close();
  }
}
