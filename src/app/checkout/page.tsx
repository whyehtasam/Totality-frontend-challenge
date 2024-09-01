"use client";

import React, { useState } from "react";
import { useBooking } from "@/context/BookingContext";
import CheckoutForm from "../components/CheckoutForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Mail, PhoneCall } from "lucide-react";

const CheckoutPage: React.FC = () => {
  const { cart, total, completePurchase } = useBooking();
  const [submitted, setSubmitted] = useState(false);

  const handleCheckout = (bookingDetails: {
    name: string;
    email: string;
    phone: string;
  }) => {
    console.log("Booking Details:", bookingDetails);
    completePurchase(); // Mark items as purchased
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md border-slate-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-slate-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-slate-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Thank You for Your Booking!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-slate-600 mb-6">
              Your reservation has been successfully confirmed. We're looking
              forward to seeing you!
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-700">
                <Calendar className="w-5 h-5 text-slate-500" />
                <span>Your booking details have been saved</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <Mail className="w-5 h-5 text-slate-500" />
                <span>A confirmation email has been sent</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <PhoneCall className="w-5 h-5 text-slate-500" />
                <span>We'll contact you if any changes occur</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add properties to your cart.</p>
      ) : (
        <>
          <CheckoutForm onSubmit={handleCheckout} />
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
