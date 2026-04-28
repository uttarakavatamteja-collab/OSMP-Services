import {
  Sparkles, Wrench, Scissors, Paintbrush,
  Stethoscope, Tv, Bug, Truck, Search, Calendar, UserCheck,
  ShieldCheck, Clock, ThumbsUp, Star
} from "lucide-react";

export const categories = [
  { name: "Cleaning", icon: Sparkles, color: "text-blue-500", bg: "bg-blue-50", href: "/services/cleaning" },
  { name: "Repairs", icon: Wrench, color: "text-orange-500", bg: "bg-orange-50", href: "/services/repairs" },
  { name: "Salon", icon: Scissors, color: "text-pink-500", bg: "bg-pink-50", href: "/services/salon" },
  { name: "Painting", icon: Paintbrush, color: "text-indigo-500", bg: "bg-indigo-50", href: "/services/painting" },
  { name: "Health", icon: Stethoscope, color: "text-emerald-500", bg: "bg-emerald-50", href: "/services/health" },
  { name: "Appliances", icon: Tv, color: "text-red-500", bg: "bg-red-50", href: "/services/appliances" },
  { name: "Pest Control", icon: Bug, color: "text-green-500", bg: "bg-green-50", href: "/services/pest-control" },
  { name: "Moving", icon: Truck, color: "text-amber-500", bg: "bg-amber-50", href: "/services/moving" },
];

export const featuredServices = [
  {
    id: "1",
    title: "Full Home Deep Cleaning",
    category: "Cleaning",
    price: "499",
    originalPrice: "799",
    rating: 4.9,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800",
    duration: "3-5 hours",
    isFeatured: true,
    badge: "Bestseller"
  },
  {
    id: "2",
    title: "Haircut & Grooming",
    category: "Salon",
    price: "249",
    originalPrice: "399",
    rating: 4.8,
    reviews: 850,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
    duration: "45 mins",
    isFeatured: true
  },
  {
    id: "3",
    title: "AC Filter Cleaning & Checkup",
    category: "Repairs",
    price: "399",
    originalPrice: "599",
    rating: 4.7,
    reviews: 920,
    image: "https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?auto=format&fit=crop&q=80&w=800",
    duration: "1 hour",
    badge: "Seasonal"
  },
  {
    id: "4",
    title: "Switch & Socket Repair",
    category: "Repairs",
    price: "149",
    originalPrice: "249",
    rating: 4.9,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    duration: "30 mins",
  }
];

export const steps = [
  {
    title: "Choose Your Service",
    description: "Browse curated services from verified professionals starting as low as ₹149.",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    title: "Book & Schedule",
    description: "Pick a convenient time slot and tell us where you need the service in seconds.",
    icon: Calendar,
    color: "bg-purple-500",
  },
  {
    title: "Sit Back & Relax",
    description: "A background-verified professional will arrive at your door to handle the rest.",
    icon: UserCheck,
    color: "bg-emerald-500",
  },
];

export const benefits = [
  {
    title: "Verified Professionals",
    description: "Every service partner goes through a rigorous 4-step background verification process.",
    icon: ShieldCheck,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-500/20"
  },
  {
    title: "On-Time Service",
    description: "We value your time. Our professionals arrive within the 15-minute window or you get a discount.",
    icon: Clock,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-500/20"
  },
  {
    title: "Quality Guaranteed",
    description: "Not happy with the service? We offer a 100% money-back guarantee or a free re-work.",
    icon: ThumbsUp,
    color: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-500/20"
  }
];

export const testimonials = [
  {
    id: "1",
    name: "Rahul Sharma",
    role: "Verified User",
    avatar: "/avatars/user-1.jpg",
    content: "The AC service was exceptional. The professional was very polite and did a thorough job. Truly amazing at this price point!",
    rating: 5,
    service: "AC Maintenance",
    date: "2 days ago"
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "Verified User",
    avatar: "/avatars/user-2.jpg",
    content: "Used the deep cleaning service for my new apartment. Everything was sparkling clean. Highly recommend OMSP!",
    rating: 5,
    service: "Deep Cleaning",
    date: "1 week ago"
  },
  {
    id: "3",
    name: "Anish Gupta",
    role: "Verified User",
    avatar: "/avatars/user-3.jpg",
    content: "The barber was very professional and well-equipped. It was so convenient to get a premium haircut at home.",
    rating: 4,
    service: "Men's Salon",
    date: "3 days ago"
  }
];

export const faqs = [
  {
    question: "How do you verify your professionals?",
    answer: "Every professional on OMSP undergoes a background check through government-verified agencies, followed by a personal interview and a skill assessment test."
  },
  {
    question: "Is there a service guarantee?",
    answer: "Yes! All our services come with a 7-day quality guarantee. If anything isn't right, we'll fix it for free."
  },
  {
    question: "How do I pay for the service?",
    answer: "You can pay via UPI, Credit/Debit card, or Net Banking after the service is completed. We also support Cash on Delivery for most services."
  },
  {
    question: "Can I reschedule my booking?",
    answer: "Absolutely. You can reschedule or cancel your booking for free up to 3 hours before the scheduled time."
  }
];
