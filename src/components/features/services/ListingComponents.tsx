"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Filter, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ListingHeader = () => {
  return (
    <div className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur-md px-4 py-4 md:px-8">
      <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Cleaning Services</h1>
          <p className="text-sm text-muted-foreground">124 services found in Bangalore</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search within cleaning..." className="pl-10 rounded-xl" />
          </div>
          <Button variant="outline" size="icon" className="md:hidden">
             <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ListingSidebar = () => {
  return (
    <aside className="hidden w-80 shrink-0 space-y-8 md:block">
      {/* Category Filter */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Sub Categories</h3>
        <div className="space-y-2">
          {["Full Home Cleaning", "Bathroom Cleaning", "Kitchen Cleaning", "Sofa Cleaning", "Carpet Cleaning"].map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm font-medium hover:text-primary cursor-pointer group">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="group-hover:translate-x-1 transition-transform">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Average Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm font-medium hover:text-primary cursor-pointer">
              <input type="radio" name="rating" className="h-4 w-4 border-gray-300 text-primary focus:ring-primary" />
              <span className="flex items-center gap-1">
                {r}+ <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Min</span>
              <Input type="number" placeholder="₹0" className="h-9" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Max</span>
              <Input type="number" placeholder="₹500" className="h-9" />
            </div>
          </div>
          <Button className="w-full gradient-primary">Apply Filters</Button>
        </div>
      </div>
    </aside>
  );
};
