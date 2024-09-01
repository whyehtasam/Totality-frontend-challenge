"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Property {
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
  bookingDate?: string;
  status?: "Pending" | "Purchased"; // Add status property
}

interface BookingContextProps {
  cart: Property[];
  purchasedItems: Property[]; // New state to keep track of purchased items
  favorites: Set<string>;
  total: number;
  addToCart: (property: Property) => void;
  removeFromCart: (id: number) => void;
  updateCartItem: (id: number, quantity: number) => void;
  clearCart: () => void;
  completePurchase: () => void; // Function to mark items as purchased
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Property[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<Property[]>([]); // Initialize purchased items state
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const addToCart = (property: Property) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === property.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === property.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...property, quantity: 1, status: "Pending" }]; // Added missing bracket here
    });
  };
  

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateCartItem = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const completePurchase = () => {
    setPurchasedItems((prevPurchased) => [
      ...prevPurchased,
      ...cart.map(item => ({ ...item, status: "Purchased" }))
    ]);
    clearCart(); // Clear the cart after purchase
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id.toString())) {
        newFavorites.delete(id.toString());
      } else {
        newFavorites.add(id.toString());
      }
      return newFavorites;
    });
  };

  const isFavorite = (id: number) => favorites.has(id.toString());

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <BookingContext.Provider
      value={{
        cart,
        purchasedItems,
        favorites,
        total,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        completePurchase,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  console.log("Context in useBooking:", context); // Debugging line
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
