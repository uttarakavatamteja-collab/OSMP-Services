"use client";

import { motion } from "framer-motion";
import { 
  Users, DollarSign, Briefcase, TrendingUp,
  MapPin, Clock, CheckCircle2, XCircle,
  Bell, Search, Filter, Mail, Phone,
  ChevronRight, Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const vendorStats = [
  { label: "Monthly Earnings", value: "$4,250", icon: DollarSign, change: "+12.5%", color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Active Requests", value: "8", icon: Briefcase, change: "2 urgent", color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Completed Jobs", value: "142", icon: CheckCircle2, change: "+5 this week", color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Customer Rating", value: "4.9", icon: Star, change: "85 reviews", color: "text-amber-500", bg: "bg-amber-50" },
];

const jobRequests = [
  {
    id: "REQ-7721",
    customer: "Sarah Jenkins",
    service: "Deep Home Cleaning",
    location: "Upper West Side, NY",
    time: "Today, 04:00 PM",
    price: "89.00",
    status: "New"
  },
  {
    id: "REQ-7724",
    customer: "Michael Chen",
    service: "Bathroom Sanitization",
    location: "Brooklyn, NY",
    time: "Tomorrow, 10:00 AM",
    price: "45.00",
    status: "New"
  }
];

export default function VendorDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Placeholder (simplified for demo) */}
      <aside className="hidden w-20 flex-col items-center border-r bg-background py-8 md:flex">
         <div className="h-10 w-10 rounded-xl gradient-primary mb-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white"/>
            </svg>
         </div>
         <nav className="space-y-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center cursor-pointer">
               <TrendingUp className="h-5 w-5" />
            </div>
            <div className="h-10 w-10 rounded-lg text-muted-foreground hover:bg-muted flex items-center justify-center cursor-pointer">
               <Briefcase className="h-5 w-5" />
            </div>
            <div className="h-10 w-10 rounded-lg text-muted-foreground hover:bg-muted flex items-center justify-center cursor-pointer">
               <Users className="h-5 w-5" />
            </div>
            <div className="h-10 w-10 rounded-lg text-muted-foreground hover:bg-muted flex items-center justify-center cursor-pointer">
               <Mail className="h-5 w-5" />
            </div>
         </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="mx-auto max-w-6xl space-y-10">
          
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight">Vendor Dashboard</h1>
              <p className="text-muted-foreground">Manage your services, requests and track your earnings.</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex items-center gap-2 rounded-xl border bg-background px-3 py-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold">Online & Accepting Jobs</span>
               </div>
               <Button className="rounded-xl gradient-primary font-bold">
                  Manage Services
               </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
             {vendorStats.map((stat, i) => (
               <Card key={i} className="border-none shadow-xl shadow-black/[0.03]">
                  <CardContent className="p-6 space-y-3">
                     <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                           <p className="text-2xl font-black">{stat.value}</p>
                           <span className="text-[10px] font-bold text-emerald-500">{stat.change}</span>
                        </div>
                     </div>
                  </CardContent>
               </Card>
             ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
             {/* Left Column (Requests & Activity) */}
             <div className="lg:col-span-2 space-y-8">
                <Card className="border-none shadow-xl shadow-black/[0.03]">
                   <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold">New Job Requests</CardTitle>
                        <CardDescription>You have 2 new requests today.</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl font-bold">View History</Button>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      {jobRequests.map((req) => (
                        <div key={req.id} className="group relative flex flex-col md:flex-row md:items-center gap-6 rounded-2xl border p-5 transition-all hover:border-primary/30 hover:bg-primary/5">
                           <div className="flex flex-1 items-start gap-4">
                              <Avatar className="h-12 w-12 border-2 border-background shadow-lg">
                                 <AvatarFallback>{req.customer.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                 <h4 className="font-bold">{req.customer}</h4>
                                 <p className="text-sm font-semibold">{req.service}</p>
                                 <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase">
                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {req.location}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {req.time}</span>
                                 </div>
                              </div>
                           </div>
                           <div className="flex flex-col md:items-end gap-3 justify-center">
                              <p className="text-xl font-black">${req.price}</p>
                              <div className="flex items-center gap-2">
                                 <Button size="sm" variant="ghost" className="rounded-xl text-destructive hover:bg-destructive/10">Decline</Button>
                                 <Button size="sm" className="rounded-xl gradient-primary font-bold px-6">Accept</Button>
                              </div>
                           </div>
                        </div>
                      ))}
                   </CardContent>
                </Card>

                {/* Earnings Overview Visualization (Mock) */}
                <Card className="border-none shadow-xl shadow-black/[0.03]">
                   <CardHeader>
                      <CardTitle className="text-lg font-bold">Earnings Overview</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      <div className="flex h-48 items-end gap-3 px-2">
                         {[60, 45, 80, 55, 90, 70, 75].map((h, i) => (
                           <div key={i} className="relative flex-1 group">
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                className="w-full rounded-t-lg gradient-primary opacity-80 group-hover:opacity-100 transition-opacity"
                              />
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                 ${(h * 10).toFixed(0)}
                              </div>
                              <span className="mt-2 block text-center text-[10px] font-bold text-muted-foreground uppercase">
                                 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                              </span>
                           </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>
             </div>

             {/* Right Column (Insights) */}
             <div className="space-y-8">
                <Card className="border-none shadow-xl shadow-black/[0.03]">
                   <CardHeader>
                      <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Recent Reviews</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      {[1, 2].map((i) => (
                        <div key={i} className="space-y-2 pb-6 border-b last:border-0 last:pb-0">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-amber-500">
                                 {[1,2,3,4,5].map(s=><Star key={s} className="h-3 w-3 fill-current" />)}
                              </div>
                              <span className="text-[10px] font-bold text-muted-foreground uppercase">2h ago</span>
                           </div>
                           <p className="text-xs text-muted-foreground leading-relaxed italic">
                             &quot;Great service! Sarah was professional and did an amazing job with the kitchen cleaning.&quot;
                           </p>
                        </div>
                      ))}
                   </CardContent>
                </Card>

                <Card className="border-none shadow-xl shadow-black/[0.03] bg-primary text-white overflow-hidden relative">
                   <CardContent className="p-6 space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                         <TrendingUp className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold">Pro Tip</h4>
                      <p className="text-xs text-white/80">Responding within 5 minutes increases your booking chances by 40%.</p>
                      <Button variant="ghost" className="w-full text-white bg-white/10 hover:bg-white/20 font-bold rounded-xl">Enable Push Notifications</Button>
                   </CardContent>
                </Card>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
