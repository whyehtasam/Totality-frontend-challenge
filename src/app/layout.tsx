// app/layout.tsx
"use client";

import React from "react";
import { BookingProvider } from "@/context/BookingContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/magicui/particles";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-950 relative bg-background">
        <BookingProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Particles
              className="absolute inset-0 -z-10 h-full"
              quantity={200}
              ease={180}
              color={color}
              refresh
            />
            <main>{children}</main>
            <Footer className="" />
          </ThemeProvider>
        </BookingProvider>
      </body>
    </html>
  );
}
