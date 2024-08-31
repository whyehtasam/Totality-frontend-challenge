import React from "react";
import { useBooking } from "@/context/BookingContext"; // Ensure this path is correct
import PropertyCard from "@/app/components/PropertyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Favorites: React.FC = () => {
  const { favorites, cart } = useBooking();
  console.log({ favorites, cart });

  // Filter favorite properties from the cart or your main properties data source
  const favoriteProperties = cart.filter((property) =>
    favorites.has(property.id.toString())
  );

  return (
    <div>
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
