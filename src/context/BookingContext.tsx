import React, { createContext, useContext, useState, ReactNode } from "react";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  bookingDate?: string;
  quantity?: number; // Make quantity optional
}

// Extend the context with favorites management
interface BookingContextProps {
  cart: Property[];
  favorites: Set<string>; // Use a Set to store favorite property IDs
  total: number;
  addToCart: (property: Property) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
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

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateCartItem = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.has(id);
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
