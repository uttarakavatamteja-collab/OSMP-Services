"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, CheckCircle2, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ServiceDescription = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">About this service</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our deep home cleaning service is designed to transform your living space into a spotless sanctuary. 
          We use eco-friendly cleaning agents and advanced equipment to ensure every corner of your home is 
          thoroughly sanitized and cleaned.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Floor scrubbing & polishing",
            "Kitchen deep degreasing",
            "Bathroom sanitation",
            "Window & glass cleaning",
            "Cobweb removal",
            "Dusting & vacuuming"
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-slate-50 p-6 dark:bg-slate-900">
        <div className="flex items-start gap-4">
          <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold">OMSP Happiness Guarantee</h4>
            <p className="text-sm text-muted-foreground">
              Not satisfied with the service? We'll send someone back to fix it for free, or give you a full refund.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Reviews & Ratings</h2>
        <div className="flex items-center gap-4">
          <div className="text-5xl font-extrabold">4.9</div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <p className="text-sm text-muted-foreground">Based on 1,250 reviews</p>
          </div>
        </div>
        
        <div className="space-y-6 pt-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-3 pb-6 border-b last:border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div>
                    <h5 className="font-bold text-sm">John Doe</h5>
                    <p className="text-[10px] text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs font-bold">5.0</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Fantastic experience! The cleaners were professional, arrived on time, and my house has never looked this good. Highly recommended for anyone needing a deep clean.
              </p>
            </div>
          ))}
          <Button variant="outline" className="w-full">View all reviews</Button>
        </div>
      </div>
    </div>
  );
};

export const PricingPackages = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Select Package</h2>
      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="basic" className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white">Basic</TabsTrigger>
          <TabsTrigger value="standard" className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white">Standard</TabsTrigger>
          <TabsTrigger value="premium" className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white">Premium</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="pt-4">
          <PackageCard price="49" title="Essentials Clean" features={["2 Cleaners", "2 Hours", "Standard Chemicals"]} />
        </TabsContent>
        <TabsContent value="standard" className="pt-4">
          <PackageCard price="89" title="Whole Home Clean" features={["3 Cleaners", "4 Hours", "Premium Chemicals", "Kitchen Deep Clean"]} isPopular />
        </TabsContent>
        <TabsContent value="premium" className="pt-4">
          <PackageCard price="149" title="VIP Deep Clean" features={["4 Cleaners", "6 Hours", "Eco-friendly specialized", "Kitchen & Bathroom specialized", "Window Polishing"]} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PackageCard = ({ price, title, features, isPopular }: { price: string, title: string, features: string[], isPopular?: boolean }) => (
  <Card className={`relative overflow-hidden border-2 transition-all ${isPopular ? "border-primary shadow-lg shadow-primary/5" : "border-border"}`}>
    {isPopular && (
      <div className="absolute right-0 top-0 gradient-primary px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider rounded-bl-xl">
        Most Popular
      </div>
    )}
    <CardContent className="p-6 space-y-6">
      <div className="space-y-1">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black">${price}</span>
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
);
