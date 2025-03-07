import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";

export const metadata: Metadata = {
  title: {
    default: "DriveX - Rent Cars, Vans & Luxury Vehicles",
    template: "%s | DriveX",
  },
  description: "Book a vehicle for airport travel, weddings, long trips, and point-to-point travel with DriveX. Affordable and reliable rentals in Sri Lanka.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "DriveX - Rent Cars, Vans & Luxury Vehicles",
    description: "Affordable vehicle rentals for airport transfers, weddings, and long trips in Sri Lanka.",
    url: "https://www.drivex.lk",
    siteName: "DriveX",
    images: [
      {
        url: "/back.jpg",
        width: 1200,
        height: 630,
        alt: "DriveX Vehicle Rental Service",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DriveX - Vehicle Rentals",
    description: "Hire a car, van, or luxury vehicle with DriveX for reliable transport in Sri Lanka.",
    images: ["/back.jpg"],
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="canonical" href="https://www.drivex.lk" />
  {/* Structured Data for SEO */}
  <Script
    id="structured-data"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CarRental",
        name: "DriveX",
        url: "https://www.drivex.lk",
        description: "Book cars, vans, and luxury vehicles for travel in Sri Lanka.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sri Lanka",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+94742291771",
          contactType: "customer service",
        },
      }),
    }}
  />
</head>

      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
