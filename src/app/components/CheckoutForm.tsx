"use client"

import React, { useState } from "react"
import { useBooking } from "@/context/BookingContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

type CheckoutFormProps = {
  onSubmit: (bookingDetails: {
    name: string
    email: string
    phone: string
  }) => void
}

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const { cart, total, clearCart } = useBooking()
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(contactInfo)
    clearCart()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {/* <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader> */}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 mt-5">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={contactInfo.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={contactInfo.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={contactInfo.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Cart Summary</h3>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span>{item.title}</span>
                  <span>${item.price} x {item.quantity} = ${(item.price || 0) * (item.quantity || 0)}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          <Button type="submit" className="w-full">Complete Purchase</Button>
        </form>
      </CardContent>
    </Card>
  )
}