"use client";

import Image from "next/image";
import { ServiceDescription, PricingPackages } from "@/components/features/services/DetailComponents";
import { StickyBookingPanel } from "@/components/features/services/StickyBookingPanel";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Heart, Star } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner & Gallery */}
      <section className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src="/cleaning.png"
          alt="Service Banner"
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
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Cleaning</span>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span>4.9 (1.2k+ Reviews)</span>
                </div>
             </div>
             <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                Whole Home Deep Cleaning
             </h1>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 md:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column (Main Info) */}
          <div className="lg:col-span-2 space-y-12">
            <PricingPackages />
            <ServiceDescription />
            
            {/* FAQ Section */}
            <div className="space-y-6">
               <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
               <div className="space-y-4">
                  {[
                    { q: "How long does a deep clean take?", a: "Typically, it takes between 4-6 hours depending on the size of your home." },
                    { q: "Do I need to be home?", a: "It's entirely up to you. Most customers provide access and return once the job is finished." },
                    { q: "Are chemicals safe for pets?", a: "Yes, we use eco-friendly, non-toxic cleaning agents that are safe for pets and children." }
                  ].map((faq, i) => (
                    <div key={i} className="rounded-xl border p-4 space-y-2">
                       <h4 className="font-bold text-sm">{faq.q}</h4>
                       <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Column (Booking Widget) */}
          <div className="relative">
            <StickyBookingPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
