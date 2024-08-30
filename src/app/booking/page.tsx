// app/booking/page.tsx
"use client";

import React from "react";
import { useBooking } from "@/context/BookingContext";
import CartItem from "@/app/components/CartItem";

const BookingPage: React.FC = () => {
  const { cart, removeFromCart, total } = useBooking();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Booking Management</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
          <div className="mt-4 text-lg font-bold">Total: ${total}</div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
