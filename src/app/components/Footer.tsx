// app/components/Footer.tsx
"use client";

import React from "react";


const Footer = ({className}:{className:string}) => {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center ">
      <p>&copy; 2024 Property Rental Platform. All rights reserved.</p>
    </footer>
  );
};

export default Footer;