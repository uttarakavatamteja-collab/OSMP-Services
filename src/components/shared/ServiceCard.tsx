"use client";

import Image from "next/image";
import { Star, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";

interface ServiceCardProps {
  id: string;
  title: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  duration: string;
  isFeatured?: boolean;
}

export const ServiceCard = ({ 
  id, title, category, price, rating, reviews, image, duration, isFeatured 
}: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative h-full overflow-hidden rounded-2xl border bg-background transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {isFeatured && (
          <Badge className="absolute left-4 top-4 gradient-primary border-none text-white font-bold">
            Best Seller
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{category}</span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
              <Star className="h-3 w-3 fill-current" />
              <span>{rating} ({reviews})</span>
            </div>
          </div>
          <h3 className="font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Starts from</span>
            <span className="text-lg font-bold">${price}</span>
          </div>
          <Button asChild size="sm" className="rounded-lg gradient-primary font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            <Link href={`/services/${id}`}>
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
