# 🚖 RideShare Pro - Next.js Ride-Booking Platform

![Project Banner](/public/banner.png) 
*A modern Uber-like web app with real-time booking, dynamic pricing, and admin dashboard*

## 🌟 Features

### 🛡️ Authentication
- Email/password login
- Google OAuth integration
- Session management with NextAuth.js

### 🗺️ Ride Booking
- Interactive map (Google Maps/Mapbox)
- Location autocomplete
- Fare estimation calculator
- Vehicle type selection

### 💻 Dashboard
- User booking history
- Admin management panel
- Support ticket system
- Rating and reviews

### 🚀 Tech Highlights
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- NextAuth.js
- Vercel Serverless Functions

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm/bun
- Google Cloud API key (for Maps)
- Firebase credentials (if using)

```bash
# Clone repository
git clone https://github.com/yourusername/ride-share-pro.git
cd ride-share-pro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
