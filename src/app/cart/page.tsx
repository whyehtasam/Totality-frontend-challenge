"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { MinusCircle, PlusCircle, Trash2, Eye } from "lucide-react";
import { Calendar, DollarSign, MapPin } from "lucide-react";
// Import or define your item type here
interface item {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
  bedrooms: number;
  hasWifi?: boolean;
  quantity?: number;
  amenities: string[];
  bookingDate?: string; // Add this line
}

// Assuming itemDetailsModal is a separate component
// import itemDetailsModal from "@/app/components/itemDetailsModal";
import PropertyDetailsDialog from "../components/PropertyDetailsModal";

export default function CartPage() {
  const router = useRouter();
  const { cart, total, removeFromCart, clearCart, updateCartItem } =
    useBooking();
  const [selecteditem, setSelecteditem] = useState<item | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleViewDetails = (item: item) => {
    setSelecteditem(item);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="container max-w-3xl p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <Card>
            {cart.map((item, index) => (
              <React.Fragment key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price} per night
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={
                          () =>
                            updateCartItem(item.id, (item.quantity ?? 1) - 1) // Ensure quantity is a number
                        }
                        disabled={(item.quantity ?? 1) <= 1}
                      >
                        <MinusCircle className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">
                        {item.quantity ?? 1}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={
                          () =>
                            updateCartItem(item.id, (item.quantity ?? 0) + 1) // Ensure quantity is a number
                        }
                      >
                        <PlusCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                   
                    <PropertyDetailsDialog
                      item={item}
                      onClose={() => setIsOpen(false)}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
                {index < cart.length - 1 && <Separator />}
              </React.Fragment>
            ))}
            <CardFooter className="grid gap-5 sm:flex sm:items-center sm:justify-between  p-6">
              <div className="text-xl font-bold">Total: ${total}</div>
              <div className="space-x-2 w-full sm:w-max grid grid-cols-2 ">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button onClick={handleCheckout}>Checkout</Button>
              </div>
            </CardFooter>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg text-muted-foreground">Your cart is empty.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
