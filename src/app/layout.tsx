// app/layout.tsx
"use client";

import React from "react";
import { BookingProvider } from "@/context/BookingContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BookingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer className=""/>
        </BookingProvider>
      </body>
    </html>
  );
}
