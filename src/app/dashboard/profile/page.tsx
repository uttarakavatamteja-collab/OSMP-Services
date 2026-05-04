"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Grid, Calendar, CreditCard, LogOut, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [detecting, setDetecting] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setProfile({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 98765 43210",
        address: "123 Luxury Ave, Suite 405, Manhattan, NY 10001"
      });
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setSavedMessage("Profile saved successfully!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const detectLocation = () => {
    setDetecting(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setDetecting(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        setProfile((prev) => ({
          ...prev,
          address: `Latitude: ${lat}, Longitude: ${lon} (Auto-detected in Bangalore, Karnataka)`
        }));
        setDetecting(false);
      },
      (err) => {
        alert("Failed to retrieve location. Please grant location permissions.");
        setDetecting(false);
      }
    );
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
            <Link href="/dashboard/bookings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
               <Calendar className="h-4 w-4" /> My Bookings
            </Link>
            <Link href="/dashboard/profile" className="flex items-center gap-3 rounded-xl bg-primary/5 px-4 py-3 text-sm font-bold text-primary ring-1 ring-primary/20">
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
        <div className="mx-auto max-w-3xl space-y-8">
          
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">Customer Profile</h1>
            <p className="text-muted-foreground">Manage your customer information and geo-tag location details.</p>
          </div>

          <Card className="border-none shadow-xl shadow-black/[0.03] bg-white dark:bg-slate-900">
            <CardHeader>
               <CardTitle className="text-lg font-bold">Account Information</CardTitle>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSave} className="space-y-6">
                  {savedMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 font-semibold text-sm"
                    >
                      {savedMessage}
                    </motion.div>
                  )}

                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-sm font-bold">Full Name</label>
                        <div className="relative">
                           <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                           <Input 
                              value={profile.name}
                              onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                              placeholder="Your full name" 
                              className="pl-10 h-12 rounded-xl"
                              required 
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-bold">Email Address</label>
                        <div className="relative">
                           <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                           <Input 
                              value={profile.email}
                              onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                              type="email"
                              placeholder="Your email address" 
                              className="pl-10 h-12 rounded-xl"
                              required 
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-bold">Phone Number</label>
                        <div className="relative">
                           <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                           <Input 
                              value={profile.phone}
                              onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                              placeholder="Your phone number" 
                              className="pl-10 h-12 rounded-xl"
                              required 
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-bold">Address & Geo Location</label>
                        <div className="flex gap-2">
                           <div className="relative flex-1">
                              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input 
                                 value={profile.address}
                                 onChange={(e) => setProfile((prev) => ({ ...prev, address: e.target.value }))}
                                 placeholder="Your street address" 
                                 className="pl-10 h-12 rounded-xl flex-1"
                                 required 
                              />
                           </div>
                           <Button 
                              type="button" 
                              onClick={detectLocation}
                              disabled={detecting}
                              className="h-12 rounded-xl gradient-primary font-bold px-4 shrink-0 flex gap-2"
                           >
                              <Navigation className="h-4 w-4" />
                              {detecting ? "Locating..." : "Auto Detect"}
                           </Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Coordinates are captured via the browser Geolocation API.</p>
                     </div>
                  </div>

                  <Button type="submit" className="w-full h-12 rounded-xl gradient-primary font-bold text-lg shadow-lg">
                     Save Profile
                  </Button>
               </form>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
