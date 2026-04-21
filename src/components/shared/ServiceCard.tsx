"use client";

import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  id: string;
  title: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  duration: string;
  isFeatured?: boolean;
  badge?: string;
}

export const ServiceCard = ({ 
  id, title, category, price, originalPrice, rating, reviews, image, duration, isFeatured, badge 
}: ServiceCardProps) => {
  const savings = originalPrice ? parseInt(originalPrice) - parseInt(price) : 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative h-full overflow-hidden rounded-[2rem] border border-slate-100 bg-white transition-all hover:border-primary/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        
        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {isFeatured && (
            <Badge className="gradient-primary border-none text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full shadow-lg">
              {badge || "Bestseller"}
            </Badge>
          )}
          {savings > 0 && (
            <Badge className="bg-emerald-500 border-none text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full shadow-lg">
              Save ₹{savings}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary/80">{category}</span>
            <div className="flex items-center gap-1.5 text-xs font-bold bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg text-amber-600 dark:text-amber-500">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{rating} <span className="opacity-50 font-medium">({reviews})</span></span>
            </div>
          </div>
          <h3 className="text-xl font-bold tracking-tight line-clamp-2 leading-snug group-hover:text-primary transition-colors">{title}</h3>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary/60" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">₹{price}</span>
              {originalPrice && (
                <span className="text-sm text-slate-400 line-through font-medium">₹{originalPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Starting Price</span>
          </div>
          <Link 
            href={`/services/${id}`}
            className={cn(buttonVariants({ size: "default" }), "rounded-2xl gradient-primary font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all px-6")}
          >
            Book
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
