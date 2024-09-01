"use client";

import React, { useEffect, useState } from "react";
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
import { auth } from "@/app/utils/firebaseConfig"; // Import Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import ShimmerButton from "@/components/magicui/shimmer-button";
const Navbar = () => {
  const { cart } = useBooking(); // Get cart from context
  const cartItemsCount = cart.reduce(
    (count, item) => count + (item.quantity || 0),
    0
  ); // Calculate total items in cart

  const [user, setUser] = useState<any>(null); // User state

  const router = useRouter();
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User logged in:", user);
      router.push("/");
    }
  }, [user]);
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container flex h-14 items-center">
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
              <Link href="/favorites" className="block">Favorites</Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="mr-4  md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Home className="hidden sm:inline-block h-6 w-6" />
            <span className=" font-bold sm:inline-block">Property Rental</span>
          </Link>
          <div className="hidden sm:inline-block sm:flex items-center space-x-4 text-sm font-medium">
            {/* <Link href="/">Home</Link> */}
            <Link href="/booking">Bookings</Link>
            {/* <Link href="/cart">Cart</Link> */}
            <Link href="/favorites">Favorites</Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
          <div className="hidden sm:inline-block w-full flex-1 md:w-auto md:flex-none">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search properties..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </form>
          </div>
          <nav className="flex items-center space-x-2 ">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="md:flex relative">
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
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="h-7 w-7 rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile">Hello, {user.displayName}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <ShimmerButton className="shadow-xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 ">
                    Login
                  </span>
                </ShimmerButton>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
