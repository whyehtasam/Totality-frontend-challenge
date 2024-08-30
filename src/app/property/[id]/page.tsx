"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { properties } from "@/app/utils/dummyData"

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useBooking();

  // Find the property that matches the ID from the URL
  const property = properties.find((property) => property.id === Number(id));

  if (!property) {
    return <div className="container mx-auto p-4">Property not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        className="my-4 w-full h-64 object-cover rounded"
      />
      <p className="text-lg">{property.description}</p>
      <p className="text-xl font-bold">${property.price} / night</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => addToCart(property)}
      >
        Book Now
      </button>
    </div>
  );
}
