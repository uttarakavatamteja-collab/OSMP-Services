"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const featuredServices = [
  {
    id: "1",
    title: "Deep Home Cleaning",
    category: "Cleaning",
    price: "49.00",
    rating: 4.9,
    reviews: 1250,
    image: "/cleaning.png",
    duration: "2-4 hours",
    isFeatured: true
  },
  {
    id: "2",
    title: "Premium Home Salon",
    category: "Salon",
    price: "35.00",
    rating: 4.8,
    reviews: 850,
    image: "/salon.png",
    duration: "1-2 hours",
    isFeatured: true
  },
  {
    id: "3",
    title: "AC Deep Maintenance",
    category: "Repairs",
    price: "25.00",
    rating: 4.7,
    reviews: 920,
    image: "/cleaning.png", // Using cleaning as fallback for demo
    duration: "45 mins",
  },
  {
    id: "4",
    title: "Furniture Assembly",
    category: "Repairs",
    price: "15.00",
    rating: 4.9,
    reviews: 430,
    image: "/salon.png", // Using salon as fallback for demo
    duration: "1 hour",
  }
];

export const FeaturedServices = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Featured Services</h2>
            <p className="text-muted-foreground">Most booked services this week</p>
          </div>
          <Link 
            href="/services" 
            className="group flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Explore all
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
