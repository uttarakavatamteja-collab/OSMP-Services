"use client";

import { motion } from "framer-motion";
import { 
  Calendar, Clock, MapPin, User, Settings, 
  CreditCard, LogOut, Grid, CheckCircle2,
  Package, Bell, Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState, useEffect } from "react";

const initialBookings = [
  {
    id: "BK-9021",
    service: "Full Home Deep Cleaning",
    date: "17 Apr 2026",
    time: "11:00 AM",
    status: "Confirmed",
    price: "499",
    address: "123 Luxury Ave, Suite 405, Manhattan, NY 10001"
  },
  {
    id: "BK-8842",
    service: "AC Filter Cleaning & Checkup",
    date: "22 Apr 2026",
    time: "02:30 PM",
    status: "Pending",
    price: "399",
    address: "123 Luxury Ave, Suite 405, Manhattan, NY 10001"
  }
];

export default function BookingsPage() {
  const [profile, setProfile] = useState({ name: "John Doe" });
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    const savedBookings = localStorage.getItem("userBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings(initialBookings);
      localStorage.setItem("userBookings", JSON.stringify(initialBookings));
    }
  }, []);

  const deleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("userBookings", JSON.stringify(updated));
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar (Desktop) */}
      <aside className="hidden w-64 border-r bg-background md:block">
        <div className="flex h-full flex-col p-6">
          <div className="mb-8 flex items-center gap-3">
             <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                <AvatarFallback>JD</AvatarFallback>
             </Avatar>
             <div className="space-y-0.5">
                <p className="text-sm font-bold">{profile.name || "John Doe"}</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Premium Member</p>
             </div>
          </div>
          
          <nav className="flex-1 space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
               <Grid className="h-4 w-4" /> Dashboard
            </Link>
            <Link href="/dashboard/bookings" className="flex items-center gap-3 rounded-xl bg-primary/5 px-4 py-3 text-sm font-bold text-primary ring-1 ring-primary/20">
               <Calendar className="h-4 w-4" /> My Bookings
            </Link>
            <Link href="/dashboard/profile" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
               <User className="h-4 w-4" /> Profile
            </Link>
            <Link href="/dashboard/addresses" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
               <MapPin className="h-4 w-4" /> Addresses
            </Link>
            <Link href="/dashboard/payments" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
               <CreditCard className="h-4 w-4" /> Payments
            </Link>
          </nav>

          <div className="space-y-2 pt-8">
            <Link href="/logout" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5">
               <LogOut className="h-4 w-4" /> Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="mx-auto max-w-4xl space-y-8">
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight">Your Bookings</h1>
              <p className="text-muted-foreground">Manage your scheduled service appointments.</p>
            </div>
            <Link href="/services">
              <Button className="rounded-xl gradient-primary font-bold">Book New Service</Button>
            </Link>
          </div>

          <Card className="border-none shadow-xl shadow-black/[0.03] bg-white dark:bg-slate-900">
             <CardHeader>
                <CardTitle className="text-lg font-bold">Booking History</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">You don&apos;t have any bookings yet.</p>
                ) : (
                  bookings.map((booking) => (
                    <motion.div 
                      key={booking.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex flex-col md:flex-row md:items-center gap-4 rounded-xl border p-5 transition-all hover:border-primary hover:bg-primary/5"
                    >
                       <div className="h-14 w-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0">
                           <span className="text-[10px] font-bold uppercase text-muted-foreground">May</span>
                           <span className="text-xl font-black leading-none">{booking.date.split(' ')[0]}</span>
                       </div>
                       <div className="flex-1 min-w-0 space-y-2">
                          <div>
                             <h4 className="font-bold text-base truncate">{booking.service}</h4>
                             <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <MapPin className="h-3 w-3 shrink-0" />
                                <span className="truncate">{booking.address}</span>
                             </p>
                          </div>
                          <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground tracking-wider uppercase">
                             <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {booking.date}</span>
                             <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {booking.time}</span>
                             <span className="hidden sm:inline">ID: {booking.id}</span>
                          </div>
                       </div>
                       <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0">
                          <Badge className={`${booking.status === 'Confirmed' ? 'bg-emerald-500' : 'bg-amber-500'} text-white border-none text-xs font-bold px-3 py-1`}>
                            {booking.status}
                          </Badge>
                          <div className="flex items-center gap-3">
                             <p className="font-black text-lg">₹{booking.price}</p>
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => deleteBooking(booking.id)}
                                className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg"
                             >
                                <Trash2 className="h-4 w-4" />
                             </Button>
                          </div>
                       </div>
                    </motion.div>
                  ))
                )}
             </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
