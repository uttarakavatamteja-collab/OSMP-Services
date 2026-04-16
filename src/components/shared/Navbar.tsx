"use client";

import Link from "next/link";
import { Search, MapPin, User, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl gradient-primary flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white"/>
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-gradient">OMSP</span>
        </Link>

        {/* Location & Search (Desktop) */}
        <div className="hidden flex-1 items-center gap-4 px-8 md:flex max-w-2xl">
          <div className="flex h-10 items-center gap-2 rounded-full border bg-muted/50 px-4 transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select className="bg-transparent text-sm focus:outline-none outline-none border-none cursor-pointer">
              <option>New York, NY</option>
              <option>London, UK</option>
              <option>Mumbai, IN</option>
            </select>
            <div className="h-4 w-px bg-border" />
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search for services..."
              className="flex-1 bg-transparent text-sm focus:outline-none outline-none border-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <div className="hidden items-center gap-4 md:flex mr-2">
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              2
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/bookings" className="w-full">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
