"use client";

import { motion } from "framer-motion";
import { Search, Calendar, UserCheck } from "lucide-react";

const steps = [
  {
    title: "Select Service",
    description: "Browse through hundreds of services and pick the one that fits your needs.",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    title: "Pick Time & Location",
    description: "Choose a convenient time slot and tell us where you need the service.",
    icon: Calendar,
    color: "bg-purple-500",
  },
  {
    title: "Enjoy Premium Service",
    description: "A verified professional will arrive at your doorstep to deliver high-quality results.",
    icon: UserCheck,
    color: "bg-emerald-500",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-2xl space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How OMSP Works</h2>
          <p className="text-muted-foreground">Booking a professional service has never been easier.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/4 left-[15%] right-[15%] h-0.5 bg-dashed border-t-2 border-dashed border-border" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative space-y-6"
            >
              <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl ${step.color} shadow-lg shadow-black/10 text-white transform hover:rotate-6 transition-transform`}>
                <step.icon className="h-10 w-10" />
                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background border-4 border-slate-50 text-sm font-bold text-black dark:border-slate-900 dark:text-white">
                  {index + 1}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
