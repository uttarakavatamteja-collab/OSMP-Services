"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/landing";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight italic">Common Questions</h2>
          <p className="text-muted-foreground text-lg italic">Everything you need to know about OMSP.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 transition-all shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-200">{faq.question}</span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-all dark:bg-slate-800 ${isOpen ? "rotate-180 bg-primary/10 text-primary" : ""}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 p-10 rounded-[3rem] bg-slate-900 text-white text-center space-y-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <h3 className="text-2xl md:text-3xl font-black italic relative z-10">Still have questions?</h3>
             <p className="text-slate-400 relative z-10">If you cannot find the answer to your question in our FAQ, you can always contact us. We will answer you shortly!</p>
             <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-4">
                 <button className="px-8 py-3 rounded-2xl bg-primary text-white font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20">Contact Support</button>
                 <button className="px-8 py-3 rounded-2xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/10">Read Documentation</button>
             </div>
        </div>
      </div>
    </section>
  );
};
