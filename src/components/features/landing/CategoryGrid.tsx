"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/landing";

export const CategoryGrid = () => {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Explore Categories</h2>
            <p className="text-muted-foreground text-lg">Premium services delivered at your doorstep by trusted professionals</p>
          </div>
          <Link 
            href="/services" 
            className="group flex items-center gap-2 text-sm font-bold text-primary px-6 py-2 rounded-full border border-primary/20 hover:bg-primary/5 transition-all"
          >
            View all categories
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link 
                href={category.href}
                className="group flex flex-col items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50/50 p-6 transition-all hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.bg} ${category.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <span className="text-sm font-bold tracking-tight text-center">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
