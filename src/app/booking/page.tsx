// app/booking/page.tsx
"use client";

import React from "react";
import { useBooking } from "@/context/BookingContext";
import CartItem from "@/app/components/CartItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
const BookingPage: React.FC = () => {
  const { cart, removeFromCart, total } = useBooking();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Booking Management</h1>
      {cart.length === 0 ? (
         <Card>
         <CardContent className="p-6 text-center">
           <p className="text-lg text-muted-foreground">Your cart is empty.</p>
         </CardContent>
       </Card>
      ) : (
        <div>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: Number(item.id),
                title: item.title,
                price: item.price,
              }}
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
