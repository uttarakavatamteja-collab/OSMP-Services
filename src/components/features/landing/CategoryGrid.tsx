"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, Wrench, Scissors, Paintbrush, 
  Stethoscope, Tv, Bug, Truck, ChevronRight 
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Cleaning", icon: Sparkles, color: "text-blue-500", bg: "bg-blue-50", href: "/services/cleaning" },
  { name: "Repairs", icon: Wrench, color: "text-orange-500", bg: "bg-orange-50", href: "/services/repairs" },
  { name: "Salon", icon: Scissors, color: "text-pink-500", bg: "bg-pink-50", href: "/services/salon" },
  { name: "Painting", icon: Paintbrush, color: "text-indigo-500", bg: "bg-indigo-50", href: "/services/painting" },
  { name: "Health", icon: Stethoscope, color: "text-emerald-500", bg: "bg-emerald-50", href: "/services/health" },
  { name: "Appliances", icon: Tv, color: "text-red-500", bg: "bg-red-50", href: "/services/appliances" },
  { name: "Pest Control", icon: Bug, color: "text-green-500", bg: "bg-green-50", href: "/services/pest-control" },
  { name: "Moving", icon: Truck, color: "text-amber-500", bg: "bg-amber-50", href: "/services/moving" },
];

export const CategoryGrid = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Explore Categories</h2>
            <p className="text-muted-foreground">Premium services delivered at your doorstep</p>
          </div>
          <Link 
            href="/services" 
            className="group flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                href={category.href}
                className="group flex flex-col items-center gap-3 rounded-2xl border bg-background p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/5 dark:hover:bg-primary/5"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.bg} ${category.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold tracking-tight">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
