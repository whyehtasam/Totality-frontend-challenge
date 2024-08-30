// app/components/CartItem.tsx
"use client";

import React from "react";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
  };
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded">
      <span>{item.title}</span>
      <span>${item.price}</span>
      <button onClick={onRemove} className="text-red-600">Remove</button>
    </div>
  );
};

export default CartItem;
