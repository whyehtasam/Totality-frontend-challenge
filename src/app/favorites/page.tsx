"use client";

import React from "react";
import Favorites from "@/app/components/Favorites";

const FavoritesPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Favorite Properties</h1>
      <Favorites />
    </div>
  );
};

export default FavoritesPage;