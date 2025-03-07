import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drivex.lk"),
  title: {
    default: "DriveX - Affordable Vehicle Rentals",
    template: "%s | DriveX",
  },
  description:
    "Book a vehicle for airport travel, weddings, long trips, and point-to-point travel with DriveX. Affordable and reliable rentals in Sri Lanka.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "DriveX - Vehicle Rentals in Sri Lanka",
    description:
      "Affordable vehicle rentals for airport transfers, weddings, and long trips in Sri Lanka.",
    url: "https://www.drivex.lk",
    siteName: "DriveX",
    images: [
      {
        url: "https://www.drivex.lk/back.jpg",
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
    description:
      "Hire a car, van, or luxury vehicle with DriveX for reliable transport in Sri Lanka.",
    images: ["https://www.drivex.lk/back.jpg"],
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
        <meta
          name="keywords"
          content="vehicle rental, car hire, airport transport, Sri Lanka taxis, DriveX rentals, DriveX, car rental, van rental, luxury car rental"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.drivex.lk" />

        {/* Structured Data for SEO */}
        <Script
          id="structured-data-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DriveX",
              "url": "https://www.drivex.lk",
              "logo": "https://www.drivex.lk/9798.png",
            }),
          }}
        />

        <Script
          id="structured-data-sitelinks"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.drivex.lk",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.drivex.lk/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <Script
          id="structured-data-pages"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Services",
                "url": "https://www.drivex.lk/services",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Contact Us",
                "url": "https://www.drivex.lk/contact",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Booking",
                "url": "https://www.drivex.lk/booking",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "About Us",
                "url": "https://www.drivex.lk/about",
              },
            ]),
          }}
        />
      </head>

      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
