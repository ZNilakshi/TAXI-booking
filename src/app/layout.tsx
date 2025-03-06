
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";

export const metadata: Metadata = {
  title: "DriveX",
  description: "Book a vehicle for airport travel, weddings, long trips, and point-to-point travel with DriveX.",
  icons: {
    icon: "/favicon.ico", // Path to your favicon in the public folder
  },

};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {const session = await getServerSession();
  return (
    
    <html lang="en">
      <body className={inter.className}>
       <SessionProvider session={session}> 
        
        {children}
        </SessionProvider>
        </body>
    </html>
    
  );
}
