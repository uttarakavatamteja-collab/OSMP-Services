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
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();

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
          <span className="text-2xl font-bold tracking-tight text-gradient">OSM Services</span>
        </Link>

        {/* Location & Search (Desktop) */}
        <div className="hidden flex-1 items-center gap-4 px-8 md:flex max-w-2xl">
          <div className="flex h-10 items-center gap-2 rounded-full border bg-muted/50 px-4 transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select className="bg-transparent text-sm focus:outline-none outline-none border-none cursor-pointer">
              <option>Bangalore, IN</option>
              <option>Hyderabad, IN</option>
              <option>Chennai, IN</option>
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
            <DropdownMenuTrigger 
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 active:translate-y-px [&_svg]:size-5 shadow-sm"
            >
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/services" className="w-full">Services</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/pricing" className="w-full">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/bookings" className="w-full">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/logout")} className="text-destructive font-bold cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger 
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 active:translate-y-px [&_svg]:size-5 shadow-sm"
            >
              <User />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/bookings" className="w-full">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/logout")} className="text-destructive font-bold cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

