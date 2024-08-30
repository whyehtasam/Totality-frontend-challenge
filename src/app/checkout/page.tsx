// /app/checkout/page.tsx
"use client";

import React, { useState } from "react";
import { useBooking } from "@/context/BookingContext";
import CheckoutForm from "../components/CheckoutForm";

const CheckoutPage: React.FC = () => {
  const { cart, total } = useBooking();
  const [submitted, setSubmitted] = useState(false);

  const handleCheckout = (bookingDetails: {
    name: string;
    email: string;
    phone: string;
  }) => {
    console.log("Booking Details:", bookingDetails);
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="container mx-auto p-4">Thank you for your booking!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add properties to your cart.</p>
      ) : (
        <>
          <div className="mb-4">Total: ${total}</div>
          <CheckoutForm onSubmit={handleCheckout} />
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
