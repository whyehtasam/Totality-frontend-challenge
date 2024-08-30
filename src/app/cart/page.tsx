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
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { MinusCircle, PlusCircle, Trash2, Eye } from "lucide-react";

// Assuming PropertyDetailsModal is a separate component
import PropertyDetailsModal from "@/app/components/PropertyDetailsModal";

export default function CartPage() {
  const router = useRouter();
  const { cart, total, removeFromCart, clearCart, updateCartItem } =
    useBooking();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleViewDetails = (property: any) => {
    setSelectedProperty(property);
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
                        onClick={() =>
                          updateCartItem(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <MinusCircle className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateCartItem(item.id, item.quantity + 1)
                        }
                      >
                        <PlusCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(item)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{item.title}</DialogTitle>
                        </DialogHeader>
                        <PropertyDetailsModal property={item} />
                      </DialogContent>
                    </Dialog>
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
