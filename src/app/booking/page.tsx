// app/booking/page.tsx
"use client";

import React from "react";
import { useBooking } from "@/context/BookingContext";
import CartItem from "@/app/components/CartItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BookingPage: React.FC = () => {
  const { purchasedItems, cart, removeFromCart, total } = useBooking();

  const combinedItems = [...cart, ...purchasedItems]; // Combine cart and purchased items for display

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Booking Management</h1>
      {combinedItems.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg text-muted-foreground">No bookings available.</p>
          </CardContent>
        </Card>
      ) : (
        <div>
          {combinedItems.map((item) => (
            <div key={item.id} className="mb-4">
              <CartItem
                item={{
                  id: Number(item.id),
                  title: item.title,
                  price: item.price,
                }}
                onRemove={() => removeFromCart(item.id)}
              />
              <Badge className="mt-2">{item.status === "Purchased" ? "Purchased" : "Pending"}</Badge>
            </div>
          ))}
          <div className="mt-4 text-lg font-bold">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
