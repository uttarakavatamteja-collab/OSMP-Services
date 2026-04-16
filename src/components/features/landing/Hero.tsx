"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32 dark:bg-slate-950">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20">
        <div className="h-96 w-96 rounded-full bg-primary" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20">
        <div className="h-96 w-96 rounded-full bg-purple-600" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium dark:bg-black/50">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Trusted by 50,000+ happy customers</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Your Trusted Home & <br />
            <span className="text-gradient">Professional Services</span>
          </h1>

          <p className="mx-auto max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            From deep cleaning to expert repairs, book top-rated professionals for all your needs in seconds.
          </p>

          {/* Hero Search (Mobile) */}
          <div className="mx-auto max-w-2xl space-y-4 md:hidden">
            <div className="space-y-2">
              <div className="flex h-12 items-center gap-3 rounded-xl border bg-background px-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <input placeholder="Current location..." className="flex-1 bg-transparent text-sm focus:outline-none" />
              </div>
              <div className="flex h-12 items-center gap-3 rounded-xl border bg-background px-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input placeholder="Search for 'AC Repair'..." className="flex-1 bg-transparent text-sm focus:outline-none" />
              </div>
            </div>
            <Button className="w-full h-12 rounded-xl gradient-primary text-base">
              Find Services
            </Button>
          </div>

          {/* Hero Search (Desktop) */}
          <div className="hidden md:flex mx-auto max-w-3xl items-center gap-0 rounded-2xl border bg-background p-2 shadow-2xl shadow-primary/10">
            <div className="flex flex-1 items-center gap-3 px-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Location</span>
                <select className="bg-transparent text-sm font-semibold focus:outline-none">
                  <option>New York, NY</option>
                  <option>London, UK</option>
                </select>
              </div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="flex-[2] flex items-center gap-3 px-4">
              <Search className="h-5 w-5 text-primary" />
              <div className="flex flex-col items-start w-full">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Find Service</span>
                <input 
                  placeholder="What are you looking for?" 
                  className="w-full bg-transparent text-sm font-semibold focus:outline-none"
                />
              </div>
            </div>
            <Button size="lg" className="h-14 rounded-xl px-8 gradient-primary font-bold text-lg hover:scale-105 transition-transform">
              Search
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-sm text-muted-foreground">
            <span>Popular:</span>
            <button className="rounded-full border bg-white px-3 py-1 hover:border-primary hover:text-primary transition-colors dark:bg-transparent">House Cleaning</button>
            <button className="rounded-full border bg-white px-3 py-1 hover:border-primary hover:text-primary transition-colors dark:bg-transparent">AC Service</button>
            <button className="rounded-full border bg-white px-3 py-1 hover:border-primary hover:text-primary transition-colors dark:bg-transparent">Mens Salon</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
