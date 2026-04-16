"use client";

import { motion } from "framer-motion";
import { 
  Calendar, Clock, MapPin, User, Settings, 
  CreditCard, LogOut, ChevronRight, CheckCircle2,
  Clock3, Package, Bell, Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const stats = [
  { label: "Total Bookings", value: "12", icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Active Services", value: "2", icon: Clock3, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Completed", value: "10", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
];

const upcomingBookings = [
  {
    id: "BK-9021",
    service: "Full Home Deep Cleaning",
    date: "17 Apr 2024",
    time: "11:00 AM",
    status: "Confirmed",
    price: "89.00"
  },
  {
    id: "BK-8842",
    service: "AC Maintenance",
    date: "22 Apr 2024",
    time: "02:30 PM",
    status: "Pending",
    price: "25.00"
  }
];

export default function UserDashboard() {
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
                <p className="text-sm font-bold">John Doe</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Premium Member</p>
             </div>
          </div>
          
          <nav className="flex-1 space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-xl bg-primary/5 px-4 py-3 text-sm font-bold text-primary ring-1 ring-primary/20">
               <GridIcon className="h-4 w-4" /> Dashboard
            </Link>
            <Link href="/dashboard/bookings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
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
            <Link href="/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted">
               <Settings className="h-4 w-4" /> Settings
            </Link>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5">
               <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="mx-auto max-w-5xl space-y-10">
          
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight">Overview</h1>
              <p className="text-muted-foreground">Welcome back, John! Here&apos;s what&apos;s happening today.</p>
            </div>
            <div className="flex items-center gap-3">
               <Button variant="outline" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary" />
               </Button>
               <Button className="rounded-xl gradient-primary font-bold">
                  Book New Service
               </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
             {stats.map((stat, i) => (
               <Card key={i} className="border-none shadow-xl shadow-black/[0.03]">
                  <CardContent className="flex items-center gap-4 p-6">
                     <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-1">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-black">{stat.value}</p>
                     </div>
                  </CardContent>
               </Card>
             ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
             {/* Left Column (Bookings) */}
             <div className="lg:col-span-2 space-y-6">
                <Card className="border-none shadow-xl shadow-black/[0.03]">
                   <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg font-bold">Upcoming Bookings</CardTitle>
                      <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">View All</Button>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="group flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-primary hover:bg-primary/5">
                           <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center overflow-hidden shrink-0">
                               <span className="text-[8px] font-bold uppercase text-muted-foreground">Apr</span>
                               <span className="text-lg font-black leading-none">{booking.date.split(' ')[0]}</span>
                           </div>
                           <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm truncate">{booking.service}</h4>
                              <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                 <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.time}</span>
                                 <span className="flex items-center gap-1">ID: {booking.id}</span>
                              </div>
                           </div>
                           <div className="text-right space-y-1">
                              <Badge className={`${booking.status === 'Confirmed' ? 'bg-emerald-500' : 'bg-amber-500'} text-white border-none text-[10px] font-bold uppercase tracking-widest`}>
                                {booking.status}
                              </Badge>
                              <p className="font-black text-sm">${booking.price}</p>
                           </div>
                        </div>
                      ))}
                   </CardContent>
                </Card>
             </div>

             {/* Right Column (Sidebar Widgets) */}
             <div className="space-y-6">
                <Card className="border-none shadow-xl shadow-black/[0.03] gradient-primary text-white overflow-hidden relative">
                   <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                   <CardContent className="p-6 relative z-10 space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                         <Star className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-lg leading-tight">Join Premium Club</h4>
                        <p className="text-xs text-white/80">Get 10% off on all services and priority support.</p>
                      </div>
                      <Button className="w-full bg-white text-primary font-black hover:bg-white/90">Upgrade Now</Button>
                   </CardContent>
                </Card>

                <Card className="border-none shadow-xl shadow-black/[0.03]">
                   <CardHeader>
                      <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">AI Recommended</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5" />
                         </div>
                         <div>
                            <p className="text-sm font-bold">Furniture Assembly</p>
                            <p className="text-[10px] text-muted-foreground">Based on your recent search</p>
                         </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full rounded-lg text-xs font-bold">Book Now</Button>
                   </CardContent>
                </Card>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const GridIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
