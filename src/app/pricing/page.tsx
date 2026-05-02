"use client";

import { motion } from "framer-motion";
import { Check, Zap, Shield, Star, ArrowRight, Sparkles, Crown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    icon: Zap,
    iconBg: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-600 dark:text-slate-300",
    monthlyPrice: 199,
    yearlyPrice: 1799,
    description: "Perfect for individuals & occasional home care needs.",
    features: [
      "Up to 2 bookings/month",
      "Access to 50+ services",
      "Standard professionals",
      "Email support",
      "Basic tracking",
      "7-day rescheduling",
    ],
    notIncluded: ["Priority booking", "Dedicated manager", "Premium pros"],
    cta: "Get Started Free",
    ctaHref: "/signup",
    popular: false,
  },
  {
    id: "standard",
    name: "Standard",
    icon: Rocket,
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    iconColor: "text-violet-600 dark:text-violet-300",
    monthlyPrice: 499,
    yearlyPrice: 4499,
    description: "The most popular plan for growing families and regular use.",
    features: [
      "Up to 8 bookings/month",
      "Access to 200+ services",
      "Top-rated professionals",
      "Priority email & chat support",
      "Live tracking & updates",
      "Free rescheduling anytime",
      "10% discount on all bookings",
      "OSM Services membership card",
    ],
    notIncluded: ["Dedicated manager"],
    cta: "Start Standard",
    ctaHref: "/signup",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-600 dark:text-amber-300",
    monthlyPrice: 999,
    yearlyPrice: 8999,
    description: "Unlimited access with white-glove service for power users.",
    features: [
      "Unlimited bookings/month",
      "Access to ALL services",
      "Elite verified professionals",
      "24/7 priority support",
      "Real-time tracking",
      "Free rescheduling & cancellation",
      "20% discount on all bookings",
      "Dedicated account manager",
      "OSM Services Gold membership",
      "Exclusive member perks",
    ],
    notIncluded: [],
    cta: "Go Premium",
    ctaHref: "/signup",
    popular: false,
  },
];

const serviceCharges = [
  { service: "Home Cleaning (Standard)", base: "₹299", fee: "₹49", gst: "₹27", total: "₹375" },
  { service: "AC Service & Repair", base: "₹399", fee: "₹59", gst: "₹19", total: "₹477" },
  { service: "Salon at Home (Men's)", base: "₹249", fee: "₹39", gst: "₹13", total: "₹301" },
  { service: "Plumbing Repair", base: "₹199", fee: "₹29", gst: "₹10", total: "₹238" },
  { service: "Pest Control (1 BHK)", base: "₹599", fee: "₹79", gst: "₹25", total: "₹703" },
  { service: "Painting (per room)", base: "₹1,499", fee: "₹149", gst: "₹58", total: "₹1,706" },
];

const faqs = [
  {
    q: "Is the platform/service charge refundable?",
    a: "The platform fee is non-refundable once a booking is confirmed. However, the service cost is fully refundable if cancelled 3+ hours before the scheduled time.",
  },
  {
    q: "Can I change my membership plan anytime?",
    a: "Yes! You can upgrade or downgrade your plan at any time from your dashboard. Changes take effect on the next billing cycle.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash After Service for most bookings.",
  },
  {
    q: "Is GST included in the displayed prices?",
    a: "Yes, all displayed prices include 18% GST. You will receive a full GST invoice after every booking for tax purposes.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 py-24 text-white">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 55%), radial-gradient(circle at 80% 20%, #6366f1 0%, transparent 55%)",
          }}
        />
        <div className="container relative mx-auto px-4 text-center md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/40 px-4 py-1 text-sm">
              <Sparkles className="h-3 w-3 mr-1 inline" /> Indian Market Pricing — All prices in ₹
            </Badge>

            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
              Simple & Transparent
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
                Pricing
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-lg text-slate-300">
              No hidden charges. No surprises. Honest pricing for world-class home services — built for India.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <span className={`text-sm font-semibold ${!isYearly ? "text-white" : "text-slate-400"}`}>Monthly</span>
              <button
                id="billing-toggle"
                onClick={() => setIsYearly(!isYearly)}
                className={`relative h-7 w-14 rounded-full transition-colors duration-300 ${
                  isYearly ? "bg-violet-500" : "bg-slate-600"
                }`}
                aria-label="Toggle billing period"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    isYearly ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm font-semibold ${isYearly ? "text-white" : "text-slate-400"}`}>
                Yearly{" "}
                <span className="text-emerald-400 text-xs font-bold ml-1">Save 25%</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mx-auto max-w-5xl">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-3xl border-2 bg-white dark:bg-slate-900 p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl ${
                  plan.popular
                    ? "border-violet-500 shadow-violet-100 dark:shadow-violet-900/20 scale-[1.02]"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-1.5 text-xs font-bold text-white shadow-lg shadow-violet-500/30">
                      ✦ Most Popular
                    </span>
                  </div>
                )}

                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${plan.iconBg}`}>
                  <plan.icon className={`h-6 w-6 ${plan.iconColor}`} />
                </div>

                <div className="mt-5 space-y-1">
                  <h2 className="text-xl font-bold">{plan.name}</h2>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-black">
                    ₹{isYearly ? plan.yearlyPrice.toLocaleString("en-IN") : plan.monthlyPrice}
                  </span>
                  <span className="text-sm text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                </div>
                {isYearly && (
                  <p className="mt-1 text-xs font-semibold text-emerald-500">
                    Save ₹{(plan.monthlyPrice * 12 - plan.yearlyPrice).toLocaleString("en-IN")} annually
                  </p>
                )}

                <Link
                  href={plan.ctaHref}
                  id={`plan-cta-${plan.id}`}
                  className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20"
                      : "border-2 border-border hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400"
                  }`}
                >
                  {plan.cta} <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="mt-8 space-y-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    What&apos;s included
                  </p>
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground line-through opacity-60">
                      <span className="mt-0.5 h-4 w-4 shrink-0 text-center text-xs leading-4">✕</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Charges Breakdown */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 space-y-3 text-center"
          >
            <h2 className="text-3xl font-extrabold tracking-tight">Service Charges Breakdown</h2>
            <p className="text-muted-foreground">
              Every booking includes a small platform fee. All prices include 18% GST — no surprises.
            </p>
          </motion.div>

          <div className="overflow-hidden rounded-2xl border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-left">
                    <th className="px-6 py-4 font-bold">Service</th>
                    <th className="px-6 py-4 font-bold text-center">Base Price</th>
                    <th className="px-6 py-4 font-bold text-center text-violet-600">Platform Fee</th>
                    <th className="px-6 py-4 font-bold text-center text-slate-500">GST (18%)</th>
                    <th className="px-6 py-4 font-bold text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceCharges.map((row, i) => (
                    <tr
                      key={row.service}
                      className={`border-t transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                        i % 2 !== 0 ? "bg-slate-50/50 dark:bg-slate-800/20" : ""
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold">{row.service}</td>
                      <td className="px-6 py-4 text-center">{row.base}</td>
                      <td className="px-6 py-4 text-center font-semibold text-violet-600">{row.fee}</td>
                      <td className="px-6 py-4 text-center text-muted-foreground">{row.gst}</td>
                      <td className="px-6 py-4 text-right font-black">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            * Platform fee varies by service category. Final total is displayed at checkout before payment.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "No Hidden Charges",
                desc: "The price you see is the price you pay — GST & platform fee included.",
              },
              {
                icon: Star,
                title: "Quality Guarantee",
                desc: "Not happy? Get a free redo or full refund within 7 days of service.",
              },
              {
                icon: Sparkles,
                title: "Indian Payment Methods",
                desc: "Pay via UPI, Credit/Debit Card, Net Banking, or Cash After Service.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3 rounded-2xl border bg-white dark:bg-slate-900 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/40">
                  <item.icon className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight">Pricing FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border p-6 space-y-2 transition-colors hover:border-violet-300 dark:hover:border-violet-700"
              >
                <h3 className="font-bold text-sm">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight">Ready to book your first service?</h2>
          <p className="text-violet-200">
            Start with no subscription required. Pay only for what you book. Upgrade your plan whenever you like.
          </p>
          <Link href="/services">
            <Button
              size="lg"
              className="mt-2 bg-white text-violet-700 font-bold hover:bg-violet-50 px-8 py-6 text-lg rounded-xl shadow-xl hover:scale-[1.02] transition-transform"
            >
              Browse All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
