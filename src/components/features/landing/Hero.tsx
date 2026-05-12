"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950 py-28 lg:py-36">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-70" />
        <Image
          src="/hero-bg.jpg"
          alt="Modern Home Interior"
          fill
          className="object-cover opacity-20 grayscale-[0.5] mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
      </div>

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-primary/20 blur-[140px] animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[130px] animate-pulse" style={{ animationDuration: "12s" }} />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-4xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-white shadow-2xl">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Trusted by 50,000+ Indian households</span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Reliable Services <br />
            <span className="text-gradient">At Your Doorstep</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl leading-relaxed">
            From deep cleaning to expert repairs, book top-rated professionals for all your needs in seconds. <br className="hidden md:block" />
            <span className="font-semibold text-primary">Starting at just ₹149.</span>
          </p>

          {/* Hero Search (Mobile) */}
          <div className="mx-auto max-w-2xl space-y-4 md:hidden">
            <div className="space-y-2">
              <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 text-white">
                <MapPin className="h-5 w-5 text-primary" />
                <input placeholder="Select city..." className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-slate-400" />
              </div>
              <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 text-white">
                <Search className="h-5 w-5 text-primary" />
                <input placeholder="What service do you need?" className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-slate-400" />
              </div>
            </div>
            <Button className="w-full h-14 rounded-2xl gradient-primary text-lg font-bold">
              Find Services
            </Button>
          </div>

          {/* Hero Search (Desktop) */}
          <div className="hidden md:flex mx-auto max-w-3xl items-center gap-0 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-white/10">
            <div className="flex flex-1 items-center gap-3 px-5">
              <MapPin className="h-6 w-6 text-primary" />
              <div className="flex flex-col items-start min-w-[120px]">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Location</span>
                <select className="bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer">
                  <option className="bg-slate-900">Bangalore</option>
                  <option className="bg-slate-900">Hyderabad</option>
                  <option className="bg-slate-900">Chennai</option>
                </select>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 mx-2" />
            <div className="flex-[2] flex items-center gap-3 px-5 text-left">
              <Search className="h-6 w-6 text-primary" />
              <div className="flex flex-col items-start w-full">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Search Service</span>
                <input
                  placeholder="e.g. AC Repair, Cleaning..."
                  className="w-full bg-transparent text-white text-sm font-semibold focus:outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
            <Button size="lg" className="h-16 rounded-2xl px-10 gradient-primary font-bold text-xl hover:scale-105 transition-all shadow-lg active:scale-95">
              Search
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-medium italic">100% Quality Assurance</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium italic">Verified Professionals</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
