"use client";

import { motion } from "framer-motion";
import { benefits } from "@/data/landing";

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Why Thousands Trust <br />
                <span className="text-primary italic">OSM Services</span> for Home Services
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We&apos;ve spent years refining our process to ensure you get the most reliable, 
                high-quality service at prices that make sense.
              </p>
            </div>

            <div className="grid gap-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${benefit.bg} ${benefit.color} transition-transform group-hover:scale-110 shadow-sm`}>
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 dark:border-slate-800">
               <img 
                 src="/why-us.jpg" 
                 alt="Professional Service" 
                 className="w-full h-auto aspect-[4/5] object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
               <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full border-2 border-primary overflow-hidden relative">
                       <img src="/avatars/user-1.jpg" alt="Technician" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold">Arjun Kumar</p>
                      <p className="text-xs opacity-70 font-medium">Expert Technician • 4.9 Rating</p>
                    </div>
                  </div>
                  <p className="text-sm italic font-medium">&quot;I take pride in my work. OSM Services ensures we have the best tools and support to deliver excellence.&quot;</p>
               </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
