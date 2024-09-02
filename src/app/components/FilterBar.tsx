"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleFilterChange = () => {
    onFilterChange({ location, priceRange, bedrooms, amenities });
    setIsFilterOpen(false); // Close the dialog after applying filters
  };

  const handleResetFilters = () => {
    setLocation("");
    setPriceRange([0, 1000]);
    setBedrooms(null);
    setAmenities([]);
    onFilterChange({
      location: "",
      priceRange: [0, 1000],
      bedrooms: null,
      amenities: [],
    });
    setIsFilterOpen(false); // Close the dialog after resetting filters
  };

  return (
    <div className="block space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center sm:mb-8 mb-4">
       <h1 className="text-3xl  font-bold sm:font-extrabold  text-gray-900 sm:text-5xl dark:text-white sm:mb-5 mb-0">
                Discover Places to Stay
              </h1>
      <div className="w-full sm:w-auto flex items-end place-content-end"><Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className=" "
          >
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[95%] rounded-lg">
          <DialogHeader>
            <DialogTitle>Filter Properties</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter a location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Price Range</Label>
              <Slider
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
                className="mt-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Select onValueChange={(value) => setBedrooms(Number(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Number of Bedrooms</SelectLabel>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <div className="space-x-2">
                <Checkbox
                id="wifi"
                checked={amenities.includes("WiFi")}
                onCheckedChange={(checked) =>
                  setAmenities((prev) =>
                    checked
                      ? [...prev, "WiFi"]
                      : prev.filter((a) => a !== "WiFi")
                  )
                }
              />
              <Label htmlFor="wifi">WiFi </Label>
              </div>
              
              <div className="space-x-2">
                <Checkbox
                id="pool"
                checked={amenities.includes("Pool")}
                onCheckedChange={(checked) =>
                  setAmenities((prev) =>
                    checked
                      ? [...prev, "Pool"]
                      : prev.filter((a) => a !== "Pool")
                  )
                }
              />
              <Label htmlFor="pool">Pool </Label>
              </div>
              
            </div>
            {/* Add more amenities filters as needed */}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleFilterChange}>
              Apply Filters
            </Button>
            <Button variant="ghost" onClick={handleResetFilters}>
              Reset
            </Button>
          </div>
        </DialogContent>
      </Dialog></div>
      
    </div>
  );
};

export default FilterBar;
