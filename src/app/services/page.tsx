"use client";

import { ListingHeader, ListingSidebar } from "@/components/features/services/ListingComponents";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "1",
    title: "Full House Deep Cleaning",
    category: "Cleaning",
    price: "499",
    rating: 4.9,
    reviews: 1250,
    image: "https://www.hommlie.com/page/full-home-cleaning-in-konanakunte-cross",
    duration: "4 hours",
    isFeatured: true
  },
  {
    id: "3",
    title: "Bathroom Deep Cleaning",
    category: "Cleaning",
    price: "249",
    rating: 4.7,
    reviews: 820,
    image: "https://www.carepondicherry.com/toilet-deep-cleaning-services.php",
    duration: "1.5 hours",
  },
  {
    id: "5",
    title: "Kitchen Cleaning & Degreasing",
    category: "Cleaning",
    price: "399",
    rating: 4.8,
    reviews: 450,
    image: "https://www.mmfs.in/kitchen-cleaning.php",
    duration: "2 hours",
  },
  {
    id: "6",
    title: "Sofa & Upholstery Cleaning",
    category: "Cleaning",
    price: "449",
    rating: 4.6,
    reviews: 320,
    image: "https://www.sdfgroups.com/blog/what-are-the-benefits-of-professional-sofa-upholstery-cleaning/",
    duration: "2 hours",
  },
  {
    id: "7",
    title: "Carpet Steam Cleaning",
    category: "Cleaning",
    price: "299",
    rating: 4.9,
    reviews: 190,
    image: "http://www.luxlimousines.com.au/benefits-carpet-steam-cleaning/",
    duration: "1 hour",
  },
  {
    id: "8",
    title: "Window & Glass Cleaning",
    category: "Cleaning",
    price: "199",
    rating: 4.5,
    reviews: 150,
    image: "https://www.urbanpartner.in/news/achieve-sparkling-clean-windows-with-urban-partner-glass-cleaning-services-in-delhi?srsltid=AfmBOoqr4O6N_TdaYkFv-jpzKPsU_Y0zkhiuR3qScJ6RcFTMjrtotkJb",
    duration: "1 hour",
  }
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
                  transition={{ delay: index * 0.05 }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Placeholder */}
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
