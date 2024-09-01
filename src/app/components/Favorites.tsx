import React from "react";
import { useBooking } from "@/context/BookingContext"; // Ensure this path is correct
import PropertyCard from "@/app/components/PropertyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {properties} from "@/app/utils/dummyData"
const Favorites: React.FC = () => {
  const { favorites, cart } = useBooking();
  console.log({ favorites, cart });

  // Filter favorite properties from the cart or your main properties data source
  const favoriteProperties = properties.filter((property) =>
    favorites.has(property.id.toString())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteProperties.length > 0 ? (
        favoriteProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))
      ) : (
        <Card className="p-4 text-center">
          <CardHeader>
            <CardTitle>No Favorites Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Add some properties to your favorites to see them here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Favorites;

