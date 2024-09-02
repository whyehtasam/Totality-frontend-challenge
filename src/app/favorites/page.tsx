"use client";

import React from "react";
import Favorites from "@/app/components/Favorites";

const FavoritesPage: React.FC = () => {
  return (
    <div className="container max-w-3xl p-4 mx-auto min-h-[95vh]">
      <h1 className="mb-8 text-3xl font-bold">Your Favorite Properties</h1>
      <Favorites />
    </div>
  );
};

export default FavoritesPage;