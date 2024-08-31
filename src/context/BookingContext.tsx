"use client"

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
  bookingDate?: string; // Add this line
}

// Extend the context with favorites management
interface BookingContextProps {
  cart: Property[];
  favorites: Set<string>; // Use a Set to store favorite property IDs
  total: number;
  addToCart: (property: Property) => void;
  removeFromCart: (id: number) => void;
  updateCartItem: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  hasWifi?: boolean;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const addToCart = (property: Property) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === property.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === property.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...property, quantity: 1 }];
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
  
  const isFavorite = (id: number) => {
    return favorites.has(id.toString());
  };

  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <BookingContext.Provider
      value={{
        cart,
        favorites,
        total,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
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
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
