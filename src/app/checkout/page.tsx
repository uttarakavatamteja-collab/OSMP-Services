"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, MapPin, CreditCard, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const steps = ["Service", "Schedule", "Address", "Payment"];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          
          {/* Header & Steps */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
               <Link 
                 href="/services/1"
                 className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
               >
                 <ArrowLeft className="h-5 w-5" />
               </Link>
               <h1 className="text-2xl font-bold tracking-tight">Booking Checkout</h1>
            </div>
            
            {/* Step Indicator */}
            <div className="flex items-center gap-4 px-4 overflow-x-auto py-2 no-scrollbar">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                   <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                     index <= currentStep ? "gradient-primary text-white" : "border bg-background text-muted-foreground"
                   }`}>
                     {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                   </div>
                   <span className={`text-xs font-bold hidden sm:block ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}>
                     {step}
                   </span>
                   {index < steps.length - 1 && <div className="h-px w-8 bg-border" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
             {/* Content Area */}
             <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                   <motion.div
                     key={currentStep}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="space-y-6"
                   >
                     {currentStep === 0 && <StepService next={nextStep} />}
                     {currentStep === 1 && <StepSchedule next={nextStep} prev={prevStep} />}
                     {currentStep === 2 && <StepAddress next={nextStep} prev={prevStep} />}
                     {currentStep === 3 && <StepPayment prev={prevStep} />}
                   </motion.div>
                </AnimatePresence>
             </div>

             {/* Order Summary (Sidebar) */}
             <div className="space-y-6">
                <Card className="border-2 border-primary/10 shadow-lg shadow-primary/5">
                   <CardContent className="p-6 space-y-6">
                      <h3 className="font-bold flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Order Summary
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex gap-3">
                           <div className="h-16 w-16 rounded-lg bg-muted relative overflow-hidden shrink-0">
                               <Image src="/cleaning.png" alt="Svc" fill className="object-cover" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-sm font-bold line-clamp-1">Whole Home Deep Cleaning</h4>
                              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Standard Package</p>
                           </div>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="space-y-2 text-sm">
                           <div className="flex justify-between">
                              <span className="text-muted-foreground">Standard Package</span>
                              <span className="font-medium">$89.00</span>
                           </div>
                           <div className="flex justify-between">
                              <span className="text-muted-foreground">Service Fee</span>
                              <span className="font-medium">$5.00</span>
                           </div>
                           <div className="flex justify-between text-emerald-500 font-bold">
                              <span>Discount (PROMO20)</span>
                              <span>-$10.00</span>
                           </div>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="flex justify-between items-center text-lg font-bold">
                           <span>Total</span>
                           <span className="text-gradient font-black">$84.00</span>
                        </div>
                      </div>
                      
                      <div className="rounded-xl bg-slate-100 p-3 text-[10px] text-muted-foreground dark:bg-slate-900">
                         Prices are inclusive of all taxes and service fees.
                      </div>
                   </CardContent>
                </Card>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-step components
const StepService = ({ next }: { next: () => void }) => (
  <Card className="p-6 space-y-6">
     <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">Review Package</h2>
        <p className="text-sm text-muted-foreground">Confirm your service details before scheduling.</p>
     </div>
     <div className="rounded-xl border p-4 space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="font-bold">Standard Whole Home Clean</h3>
           <Badge variant="outline" className="border-primary text-primary">Standard</Badge>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
           <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" /> 3 Cleaners, 4 Hours duration</li>
           <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" /> All cleaning materials included</li>
           <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" /> Kitchen & Bathroom deep cleaning</li>
        </ul>
     </div>
     <Button onClick={next} className="w-full h-12 rounded-xl gradient-primary font-bold">Confirm & Continue</Button>
  </Card>
);

const StepSchedule = ({ next, prev }: { next: () => void; prev: () => void }) => (
  <Card className="p-6 space-y-6">
     <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">Schedule Service</h2>
        <p className="text-sm text-muted-foreground">Pick a date and time slot that works best for you.</p>
     </div>
     <div className="grid grid-cols-4 gap-2">
        {[16, 17, 18, 19, 20, 21, 22, 23].map((day) => (
          <button key={day} className={`flex flex-col items-center justify-center rounded-xl border p-3 transition-all ${
            day === 17 ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20" : "hover:border-primary"
          }`}>
             <span className="text-[10px] font-bold uppercase opacity-60">Apr</span>
             <span className="text-lg font-bold">{day}</span>
          </button>
        ))}
     </div>
     <div className="space-y-3">
        <h3 className="text-sm font-bold">Available Slots</h3>
        <div className="grid grid-cols-2 gap-2">
           {["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"].map((t) => (
             <button key={t} className={`rounded-lg border p-3 text-sm font-semibold hover:border-primary transition-all ${
               t === "11:00 AM" ? "border-primary bg-primary/5 text-primary" : ""
             }`}>
               {t}
             </button>
           ))}
        </div>
     </div>
     <div className="flex gap-4">
        <Button onClick={prev} variant="outline" className="flex-1 h-12 rounded-xl">Back</Button>
        <Button onClick={next} className="flex-[2] h-12 rounded-xl gradient-primary font-bold">Next</Button>
     </div>
  </Card>
);

const StepAddress = ({ next, prev }: { next: () => void; prev: () => void }) => (
  <Card className="p-6 space-y-6">
     <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">Service Address</h2>
        <p className="text-sm text-muted-foreground">Where should we send our professionals?</p>
     </div>
     <div className="space-y-4">
        <div className="rounded-xl border p-4 flex items-start gap-4 ring-2 ring-primary/20 border-primary bg-primary/5">
           <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
           <div className="flex-1 space-y-1">
              <h4 className="font-bold text-sm">Home</h4>
              <p className="text-xs text-muted-foreground">123 Luxury Ave, Suite 405, Manhattan, NY 10001</p>
           </div>
           <Badge variant="ghost" className="text-primary font-bold">Default</Badge>
        </div>
        <Button variant="outline" className="w-full h-12 rounded-xl border-dashed">
           + Add New Address
        </Button>
     </div>
     <div className="flex gap-4">
        <Button onClick={prev} variant="outline" className="flex-1 h-12 rounded-xl">Back</Button>
        <Button onClick={next} className="flex-[2] h-12 rounded-xl gradient-primary font-bold">Proceed to Payment</Button>
     </div>
  </Card>
);

const StepPayment = ({ prev }: { prev: () => void }) => (
  <Card className="p-6 space-y-6">
     <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">Complete Payment</h2>
        <p className="text-sm text-muted-foreground">Select your preferred payment method.</p>
     </div>
     <div className="space-y-3">
        {[
          { id: "card", label: "Credit / Debit Card", icon: CreditCard },
          { id: "apple", label: "Apple Pay", icon: Check },
          { id: "cash", label: "Cash After Service", icon: MapPin }
        ].map((method) => (
          <button key={method.id} className={`flex w-full items-center gap-4 rounded-xl border p-4 transition-all hover:border-primary ${
            method.id === "card" ? "border-primary bg-primary/5 ring-2 ring-primary/20" : ""
          }`}>
             <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted">
                <method.icon className="h-5 w-5" />
             </div>
             <span className="flex-1 text-left font-bold text-sm">{method.label}</span>
          </button>
        ))}
     </div>
     <div className="flex gap-4">
        <Button onClick={prev} variant="outline" className="flex-1 h-12 rounded-xl">Back</Button>
        <Button className="flex-[2] h-14 rounded-xl gradient-primary font-bold text-lg shadow-xl shadow-primary/20">
           Confirm & Pay $84.00
        </Button>
     </div>
  </Card>
);
