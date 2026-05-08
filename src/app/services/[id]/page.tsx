"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Heart, Star, ShieldCheck, CheckCircle2, Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { allServices } from "@/data/services";
import { useState } from "react";

const categoryAddons: Record<string, { name: string; price: number }[]> = {
  Cleaning: [
    { name: "Sofa Cleaning", price: 299 },
    { name: "Balcony Wash", price: 199 },
    { name: "Bathroom Cleaning", price: 149 },
    { name: "Kitchen Cleaning", price: 249 }
  ],
  Salon: [
    { name: "Hair Styling Treatment", price: 299 },
    { name: "Pedicure & Manicure", price: 249 },
    { name: "Extra Massage session", price: 199 }
  ],
  Repairs: [
    { name: "AC gas services", price: 499 },
    { name: "General services", price: 199 },
    { name: "Gas filling", price: 399 },
    { name: "AC install and uninstallation", price: 599 }
  ],
  Moving: [
    { name: "Heavy furniture packing", price: 999 },
    { name: "Insurance add-on", price: 499 },
    { name: "Bubble wrap protection", price: 299 }
  ],
  Laptops: [
    { name: "OS Installation / Upgrade", price: 399 },
    { name: "Thermal Paste Replacement", price: 199 },
    { name: "RAM Upgrade (8GB)", price: 1499 },
    { name: "SSD Upgrade (512GB)", price: 2499 }
  ]
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = allServices.find((s) => s.id === params.id) || allServices[0];
  const [selectedPrice, setSelectedPrice] = useState(service.price);
  const [selectedPackage, setSelectedPackage] = useState("standard");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const basePriceNum = parseInt(service.price, 10) || 499;
  const basicPrice = Math.round(basePriceNum * 0.7);
  const premiumPrice = Math.round(basePriceNum * 1.5);

  const addonSum = selectedAddons.reduce((sum, name) => {
    const matched = (categoryAddons[service.category] || []).find(a => a.name === name);
    return sum + (matched ? matched.price : 0);
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Banner & Gallery */}
      <section className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Actions Over Banner */}
        <div className="container relative mx-auto h-full px-4 pt-6 md:px-8">
          <div className="flex items-center justify-between text-white">
            <Link 
              href="/services" 
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="absolute bottom-8 left-4 space-y-2 md:left-8">
             <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{service.category}</span>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{service.rating} ({service.reviews}+ Reviews)</span>
                </div>
             </div>
             <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                {service.title}
             </h1>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 md:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column (Main Info) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Select Package Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Select Package</h2>
              <Tabs defaultValue="standard" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 p-1 rounded-xl">
                  <TabsTrigger 
                    value="basic" 
                    onClick={() => { setSelectedPrice(String(basicPrice)); setSelectedPackage("basic"); }}
                    className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white"
                  >
                    Basic
                  </TabsTrigger>
                  <TabsTrigger 
                    value="standard" 
                    onClick={() => { setSelectedPrice(String(basePriceNum)); setSelectedPackage("standard"); }}
                    className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white"
                  >
                    Standard
                  </TabsTrigger>
                  <TabsTrigger 
                    value="premium" 
                    onClick={() => { setSelectedPrice(String(premiumPrice)); setSelectedPackage("premium"); }}
                    className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white"
                  >
                    Premium
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="pt-4">
                  <PackageCard 
                    price={String(basicPrice)} 
                    title="Essentials Package" 
                    features={["1 Professional Partner", service.duration, "Standard Equipment"]} 
                  />
                </TabsContent>
                <TabsContent value="standard" className="pt-4">
                  <PackageCard 
                    price={String(basePriceNum)} 
                    title="Standard Package" 
                    features={["2 Professional Partners", service.duration, "Premium Equipment", "Post-Service Cleanup"]} 
                    isPopular 
                  />
                </TabsContent>
                <TabsContent value="premium" className="pt-4">
                  <PackageCard 
                    price={String(premiumPrice)} 
                    title="VIP Package" 
                    features={["3 Professional Partners", service.duration, "Eco-friendly advanced tools", "Post-Service Cleanup", "30-day warranty"]} 
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Select Sub-Services Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Select Specific Sub-Services Required</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {(categoryAddons[service.category] || []).map((addon, idx) => (
                  <motion.label 
                    key={addon.name} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedAddons.includes(addon.name) 
                        ? "border-primary bg-primary/5 ring-2 ring-primary/10" 
                        : "border-border hover:border-primary/40 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={selectedAddons.includes(addon.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAddons((prev) => [...prev, addon.name]);
                          } else {
                            setSelectedAddons((prev) => prev.filter((a) => a !== addon.name));
                          }
                        }}
                        className="h-5 w-5 accent-primary cursor-pointer"
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-sm leading-tight">{addon.name}</span>
                        <span className="text-xs text-muted-foreground">Professional requirement</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-sm whitespace-nowrap">₹{addon.price}</span>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Dynamic Service Description */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">About this service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description || "Expert service tailored exactly to your needs. Highly rated professionals ready to deliver high quality results."}
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    "Background Verified Experts",
                    "Complete Satisfaction Guarantee",
                    "Transparent upfront pricing",
                    "Dedicated support desk"
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm">
                      <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Reviews & Ratings</h2>
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-extrabold">{service.rating}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <p className="text-sm text-muted-foreground">Based on {service.reviews}+ reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
               <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
               <div className="space-y-4">
                  {[
                    { q: "How long does this service take?", a: `Typically, it takes around ${service.duration} depending on the specific package and size of your space.` },
                    { q: "Do I need to be present?", a: "It is entirely up to you. Most customers provide initial instructions and return once the job is finished." },
                    { q: "Are chemicals/tools safe?", a: "Yes, we use eco-friendly, non-toxic cleaning and grooming agents that are perfectly safe for pets and children." }
                  ].map((faq, i) => (
                    <div key={i} className="rounded-xl border p-4 space-y-2 bg-white dark:bg-slate-900">
                       <h4 className="font-bold text-sm">{faq.q}</h4>
                       <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Column (Dynamic Booking Widget) */}
          <div className="relative">
             <div className="sticky top-24 space-y-6">
               <Card className="overflow-hidden border-2 border-primary/20 shadow-xl shadow-primary/5 bg-white dark:bg-slate-900">
                 <CardContent className="p-6 space-y-6">
                   <div className="flex items-center justify-between">
                     <div className="space-y-1">
                       <span className="text-[10px] font-bold uppercase text-muted-foreground">Service Subtotal</span>
                       <div className="text-3xl font-black">₹{selectedPrice}</div>
                     </div>
                     <div className="flex flex-col items-end gap-1">
                       <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                         <Star className="h-4 w-4 fill-current" />
                         <span>{service.rating}</span>
                       </div>
                       <span className="text-[10px] text-muted-foreground">({service.reviews}+ reviews)</span>
                     </div>
                   </div>

                   <div className="space-y-3">
                     <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3 text-sm">
                       <Calendar className="h-4 w-4 text-primary" />
                       <div className="flex-1">
                         <div className="text-[10px] font-bold uppercase text-muted-foreground">Date</div>
                         <div className="font-semibold">Select Date</div>
                       </div>
                       <ChevronRight className="h-4 w-4 text-muted-foreground" />
                     </div>

                     <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3 text-sm">
                       <Clock className="h-4 w-4 text-primary" />
                       <div className="flex-1">
                         <div className="text-[10px] font-bold uppercase text-muted-foreground">Time Slot</div>
                         <div className="font-semibold">Select Slot</div>
                       </div>
                       <ChevronRight className="h-4 w-4 text-muted-foreground" />
                     </div>
                   </div>

                   <div className="space-y-4 pt-4">
                     <div className="flex items-center justify-between text-sm">
                       <span className="text-muted-foreground">Service Fee</span>
                       <span>₹49</span>
                     </div>
                     <div className="flex items-center justify-between text-lg font-bold">
                       <span>Total Price</span>
                       <span className="text-gradient">₹{parseInt(selectedPrice, 10) + addonSum + 49}</span>
                     </div>
                   </div>

                   <Link 
                     href={`/checkout?serviceId=${service.id}&price=${selectedPrice}&package=${selectedPackage}&title=${encodeURIComponent(service.title)}&addons=${encodeURIComponent(selectedAddons.join(","))}`}
                     className={cn(buttonVariants(), "w-full h-14 rounded-xl gradient-primary text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform")}
                   >
                     Proceed to Booking
                   </Link>

                   <p className="text-[10px] text-center text-muted-foreground px-4">
                     Free cancellation up to 24 hours before the service starts.
                   </p>
                 </CardContent>
               </Card>

               <div className="flex items-center gap-4 rounded-xl border bg-slate-50 p-4 dark:bg-slate-900">
                 <MapPin className="h-8 w-8 text-primary shrink-0" />
                 <div className="space-y-1">
                   <h5 className="text-xs font-bold">Verified Professional</h5>
                   <p className="text-[10px] text-muted-foreground">
                     All our professionals are background checked and highly rated.
                   </p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PackageCard = ({ price, title, features, isPopular }: { price: string, title: string, features: string[], isPopular?: boolean }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="h-full"
  >
    <Card className={`relative overflow-hidden border-2 h-full transition-all bg-white dark:bg-slate-900 ${isPopular ? "border-primary shadow-lg shadow-primary/5" : "border-border"}`}>
      {isPopular && (
        <div className="absolute right-0 top-0 gradient-primary px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider rounded-bl-xl">
          Most Popular
        </div>
      )}
      <CardContent className="p-6 space-y-6">
        <div className="space-y-1">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black">₹{price}</span>
            <span className="text-sm text-muted-foreground">/ one-time</span>
          </div>
        </div>
        <div className="space-y-3">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
