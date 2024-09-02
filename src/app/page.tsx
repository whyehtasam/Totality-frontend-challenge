// app/page.tsx
"use client";

import React, { useState } from "react";
import PropertyList from "@/app/components/PropertyList";
import FilterBar from "@/app/components/FilterBar";
import { properties } from "./utils/dummyData";
import Hero from "./components/Hero";

export default function HomePage() {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleFilterChange = (filters: any) => {
    let filtered = properties;

    if (filters.location) {
      const locationFilter = filters.location.toLowerCase();
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(locationFilter)
      );
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(
        (property) =>
          property.price >= filters.priceRange[0] &&
          property.price <= filters.priceRange[1]
      );
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(
        (property) => property.bedrooms === filters.bedrooms
      );
    }
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((property) =>
        filters.amenities.every((amenity: string) =>
          property.amenities.includes(amenity)
        )
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="container mx-auto p-4 min-h-[80vh] ">
      {/* <h1 className="text-4xl font-bold text-center mb-8">Property Listings</h1> */}
      <Hero/>
      <FilterBar onFilterChange={handleFilterChange} />
      <PropertyList properties={filteredProperties} />
    </div>
  );
}
