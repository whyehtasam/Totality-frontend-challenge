"use client";

import React from "react";
import { useBooking } from "@/context/BookingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function BookingPage() {
  const { purchasedItems, cart, removeFromCart, total } = useBooking();

  const combinedItems = [...cart, ...purchasedItems];

  return (
    <div className="container max-w-3xl p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Booking Management</h1>
      <Card className="w-full  mx-auto my-12 pt-5">
        {/* <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader> */}
        <CardContent>
          {combinedItems.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No bookings available.
            </p>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              {combinedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b last:border-b-0"
                >
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        item.status === "Purchased" ? "default" : "secondary"
                      }
                    >
                      {item.status === "Purchased" ? "Purchased" : "Pending"}
                    </Badge>
                    {/* {item.status !== "Purchased" && (
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  )} */}
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
          {combinedItems.length > 0 && (
            <div className="mt-4 text-right font-medium">
              Total: ${total.toFixed(2)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
