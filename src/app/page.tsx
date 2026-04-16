import { Hero } from "@/components/features/landing/Hero";
import { CategoryGrid } from "@/components/features/landing/CategoryGrid";
import { FeaturedServices } from "@/components/features/landing/FeaturedServices";
import { HowItWorks } from "@/components/features/landing/HowItWorks";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CategoryGrid />
      <FeaturedServices />
      <HowItWorks />
      
      {/* Testimonials Placeholder */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground mb-12">Don't take our word for it, hear from our happy users.</p>
          <div className="flex flex-wrap justify-center gap-8 italic text-lg opacity-70">
            "Best appliance service I've ever used. The professional was on time and very knowledgeable."
          </div>
        </div>
      </section>

      {/* App Download Placeholder */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="space-y-6 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Experience OMSP on the go</h2>
            <p className="text-white/80 text-lg">
              Download our mobile app to book services effortlessly, track professionals in real-time, and get exclusive offers.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="h-14 px-8 rounded-xl bg-black text-white font-bold flex items-center gap-3 hover:scale-105 transition-transform">
                <span>App Store</span>
              </button>
              <button className="h-14 px-8 rounded-xl bg-black text-white font-bold flex items-center gap-3 hover:scale-105 transition-transform">
                <span>Google Play</span>
              </button>
            </div>
          </div>
          <div className="relative h-64 md:h-96 w-full md:w-1/2 flex items-center justify-center">
            {/* Phone Mockup Frame */}
            <div className="h-[400px] w-[200px] rounded-[3rem] border-8 border-black bg-white/20 backdrop-blur-xl relative overflow-hidden ring-4 ring-white/10">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl" />
            </div>
            <div className="absolute h-96 w-96 rounded-full bg-white/10 blur-3xl -z-10" />
          </div>
        </div>
      </section>
    </div>
  );
}
