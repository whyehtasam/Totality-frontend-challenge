import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useBooking } from "@/context/BookingContext";
import {
  Heart,
  MapPin,
  Bed,
  Wifi,
  DollarSign,
  Waves,
  FlameIcon,
  TreePalmIcon,
  TreesIcon,
  Dumbbell,
  ParkingCircleIcon
} from "lucide-react";

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
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { addToCart, toggleFavorite, isFavorite } = useBooking();

  // Function to handle booking a property
  const handleBookNow = () => {
    const bookingDate = new Date().toISOString(); // Get the current date
    addToCart({ ...property, bookingDate }); // Add the property with the booking date to the cart
  };

  // Function to render icons based on amenities
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi":
        return <Wifi className="h-4 w-4 mr-1" />;
      case "Pool":
        return <Waves className="h-4 w-4 mr-1" />;
      case "Gym":
        return <Dumbbell className="h-4 w-4 mr-1" />;
      case "Parking":
        return <ParkingCircleIcon className="h-4 w-4 mr-1" />;
      case "Fireplace":
        return <FlameIcon className="h-4 w-4 mr-1" />;
      case "Garden":
        return <TreesIcon className="h-4 w-4 mr-1" />;
      
      default:
        return null;
    }
  };

  return (
    <Card key={property.id} className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full">
          <img
            src={property.image}
            alt={property.title}
            className="rounded-t-lg h-44 sm:h-80 w-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white/100 transition-colors active:scale-95 transition-all"
            onClick={() => toggleFavorite(property.id)}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite(property.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl mb-2">{property.title}</CardTitle>
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} Beds</span>
          </div>
          {property.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center">
              {renderAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-muted/50">
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-green-600" />
          <span className="text-lg font-semibold">{property.price}</span>
          <span className="text-sm text-muted-foreground ml-1">/ night</span>
        </div>
        <Button
          onClick={handleBookNow}
          className="active:scale-95 transition-all hover:bg-gray-700 hover:dark:text-white"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
