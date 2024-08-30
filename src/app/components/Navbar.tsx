"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Home, Menu, Search, ShoppingCart, User } from "lucide-react";
import { useBooking } from "@/context/BookingContext"; // Import useBooking hook

const Navbar = () => {
  const { cart } = useBooking(); // Get cart from context
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0); // Calculate total items in cart

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Home className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Property Rental
            </span>
          </Link>
          <div className="flex items-center space-x-4 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/booking">Bookings</Link>
            <Link href="/cart">Cart</Link>
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center">
              <Home className="mr-2 h-6 w-6" />
              <span className="font-bold">Property Rental</span>
            </Link>
            <div className="my-4 flex flex-col space-y-3">
              <Link href="/" className="block">
                Home
              </Link>
              <Link href="/booking" className="block">
                Bookings
              </Link>
              <Link href="/cart" className="block">
                Cart
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search properties..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </form>
          </div>
          <nav className="flex items-center space-x-2">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className=" md:flex relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
