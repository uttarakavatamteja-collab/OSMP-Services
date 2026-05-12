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

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
            >
              <Link 
                href={category.href}
                className="group flex flex-col items-center gap-5 rounded-[2rem] border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
              >
                <div className={`flex h-20 w-20 items-center justify-center rounded-3xl ${category.bg} ${category.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-inner`}>
                  <category.icon className="h-10 w-10" />
                </div>
                <span className="text-lg font-extrabold tracking-tight text-center text-slate-900 dark:text-white group-hover:text-primary transition-colors">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
