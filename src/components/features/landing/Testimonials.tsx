"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import { testimonials } from "@/data/landing";

export const Testimonials = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight italic">What Our Community Says</h2>
          <p className="text-muted-foreground text-lg italic">Join 50,000+ happy users who've transformed their home service experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary/10 dark:bg-slate-900/50 dark:border-slate-800 dark:hover:bg-slate-900"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? "fill-current" : "text-slate-200"}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{testimonial.date}</span>
              </div>

              <blockquote className="text-lg font-medium leading-relaxed mb-8 text-slate-700 dark:text-slate-300">
                &quot;{testimonial.content}&quot;
              </blockquote>

              <div className="flex items-center justify-between pt-6 border-t border-slate-200/50 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl overflow-hidden shadow-sm border-2 border-white dark:border-slate-800">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-slate-900 dark:text-white leading-none">{testimonial.name}</p>
                      <CheckCircle2 className="h-4 w-4 text-primary fill-primary/10" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Booked {testimonial.service}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Stats */}
        <div className="mt-24 pt-16 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
                <p className="text-4xl font-black text-primary">4.8/5</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Average Rating</p>
            </div>
            <div className="space-y-1">
                <p className="text-4xl font-black text-primary">1M+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Services Delivered</p>
            </div>
            <div className="space-y-1">
                <p className="text-4xl font-black text-primary">15k+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Service Experts</p>
            </div>
            <div className="space-y-1">
                <p className="text-4xl font-black text-primary">500+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Cities Covered</p>
            </div>
        </div>
      </div>
    </section>
  );
};
