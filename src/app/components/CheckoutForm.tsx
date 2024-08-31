// /app/components/CheckoutForm.tsx
"use client";

import React, { useState } from "react";
import { useBooking } from "@/context/BookingContext";

type CheckoutFormProps = {
  onSubmit: (bookingDetails: {
    name: string;
    email: string;
    phone: string;
  }) => void;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const { cart, total, clearCart } = useBooking();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Pass booking details to parent component
    onSubmit(contactInfo);

    // Clear cart after checkout
    clearCart();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactInfo.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Cart Summary</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between py-2 border-b">
                <span>{item.title}</span>
                <span>${item.price} x {item.quantity} = ${(item.price || 0) * (item.quantity || 0)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Complete Purchase
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
