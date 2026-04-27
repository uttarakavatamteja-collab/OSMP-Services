"use client";

import { ListingHeader, ListingSidebar } from "@/components/features/services/ListingComponents";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  // --- Cleaning ---
  {
    id: "1",
    title: "Full House Deep Cleaning",
    category: "Cleaning",
    price: "499",
    originalPrice: "799",
    rating: 4.9,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800",
    duration: "4 hours",
    isFeatured: true,
    badge: "Bestseller",
  },
  {
    id: "3",
    title: "Bathroom Deep Cleaning",
    category: "Cleaning",
    price: "249",
    originalPrice: "399",
    rating: 4.7,
    reviews: 820,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    duration: "1.5 hours",
  },
  {
    id: "5",
    title: "Kitchen Cleaning & Degreasing",
    category: "Cleaning",
    price: "399",
    originalPrice: "599",
    rating: 4.8,
    reviews: 450,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800",
    duration: "2 hours",
  },
  {
    id: "6",
    title: "Sofa & Upholstery Cleaning",
    category: "Cleaning",
    price: "449",
    originalPrice: "649",
    rating: 4.6,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
    duration: "2 hours",
  },

  // --- Salon ---
  {
    id: "10",
    title: "Haircut & Styling at Home",
    category: "Salon",
    price: "249",
    originalPrice: "399",
    rating: 4.8,
    reviews: 870,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
    duration: "45 mins",
    isFeatured: true,
    badge: "Popular",
  },
  {
    id: "11",
    title: "Full Body Waxing",
    category: "Salon",
    price: "349",
    originalPrice: "499",
    rating: 4.7,
    reviews: 640,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
    duration: "1 hour",
  },
  {
    id: "12",
    title: "Facial & Skin Treatment",
    category: "Salon",
    price: "399",
    originalPrice: "599",
    rating: 4.9,
    reviews: 530,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800",
    duration: "1 hour",
  },

  // --- Repairs ---

  {
    id: "21",
    title: "Switch & Socket Repair",
    category: "Repairs",
    price: "149",
    originalPrice: "249",
    rating: 4.9,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    duration: "30 mins",
  },
  {
    id: "22",
    title: "Plumbing & Pipe Repair",
    category: "Repairs",
    price: "299",
    originalPrice: "449",
    rating: 4.6,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
    duration: "1.5 hours",
  },


  // --- Moving ---
  {
    id: "50",
    title: "Home Relocation (1 BHK)",
    category: "Moving",
    price: "2499",
    originalPrice: "3499",
    rating: 4.7,
    reviews: 480,
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=800",
    duration: "4-6 hours",
    isFeatured: true,
    badge: "Trusted",
  },
  {
    id: "51",
    title: "Furniture Assembly & Setup",
    category: "Moving",
    price: "349",
    originalPrice: "499",
    rating: 4.8,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    duration: "1-2 hours",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ListingHeader />

      <div className="container mx-auto flex flex-col gap-8 px-4 py-8 md:flex-row md:px-8">
        <ListingSidebar />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <button className="h-10 w-10 flex items-center justify-center rounded-lg border bg-background font-bold text-sm hover:border-primary transition-colors">1</button>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg border bg-background font-bold text-sm text-muted-foreground hover:border-primary transition-colors">2</button>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg border bg-background font-bold text-sm text-muted-foreground hover:border-primary transition-colors">3</button>
            <span className="px-2 text-muted-foreground">...</span>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg border bg-background font-bold text-sm text-muted-foreground hover:border-primary transition-colors">12</button>
          </div>
        </main>
      </div>
    </div>
  );
}
