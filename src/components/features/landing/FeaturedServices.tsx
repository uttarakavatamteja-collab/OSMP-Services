"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { featuredServices } from "@/data/landing";

export const FeaturedServices = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Best in Category</h2>
            <p className="text-muted-foreground text-lg">Hand-picked services with the highest ratings this month</p>
          </div>
          <Link 
            href="/services" 
            className="group flex items-center gap-2 text-sm font-bold text-primary bg-white dark:bg-slate-900 px-8 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-800"
          >
            Explore all services
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
