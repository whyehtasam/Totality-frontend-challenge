// app/layout.tsx
"use client";

import React from "react";
import { BookingProvider } from "@/context/BookingContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-950">
        <BookingProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main>{children}</main>
            <Footer className="" />
          </ThemeProvider>
        </BookingProvider>
      </body>
    </html>
  );
}
