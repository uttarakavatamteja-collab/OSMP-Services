"use client";

import { motion } from "framer-motion";
import { steps } from "@/data/landing";

export const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">How OMSP Works</h2>
          <p className="text-muted-foreground text-lg">Booking a professional service has never been easier. Just 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 relative lg:px-20">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[2.5rem] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative mb-8">
                <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-[2.5rem] ${step.color} shadow-2xl shadow-primary/20 text-white transform group-hover:rotate-6 transition-all duration-500 relative z-10`}>
                  <step.icon className="h-10 w-10" />
                </div>
                <div className="absolute -right-2 top-0 flex h-10 w-10 items-center justify-center rounded-2xl bg-white border-2 border-slate-50 text-sm font-black text-slate-900 shadow-xl z-20 dark:bg-slate-900 dark:border-slate-800 dark:text-white">
                  0{index + 1}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed px-4">
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
