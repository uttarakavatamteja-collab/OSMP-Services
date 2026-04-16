"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Grid, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Bookings", icon: Calendar, href: "/bookings" },
    { label: "Services", icon: Grid, href: "/services" },
    { label: "Profile", icon: User, href: "/dashboard" },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-md md:hidden">
      <div className="grid h-16 grid-cols-4 items-center justify-items-center bg-white/10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "scale-110")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
