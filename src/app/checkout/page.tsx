"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, Calendar, MapPin, CreditCard, 
  ShoppingBag, ArrowLeft, Smartphone, 
  Wifi, IndianRupee, CheckCircle2, PartyPopper, 
  Navigation 
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const steps = ["Service", "Schedule", "Address", "Payment"];

const allAddons = [
  { name: "Sofa Cleaning", price: 299 },
  { name: "Balcony Wash", price: 199 },
  { name: "Bathroom Cleaning", price: 149 },
  { name: "Kitchen Cleaning", price: 249 },
  { name: "Hair Styling Treatment", price: 299 },
  { name: "Pedicure & Manicure", price: 249 },
  { name: "Extra Massage session", price: 199 },
  { name: "AC gas services", price: 499 },
  { name: "General services", price: 199 },
  { name: "Gas filling", price: 399 },
  { name: "AC install and uninstallation", price: 599 },
  { name: "Heavy furniture packing", price: 999 },
  { name: "Insurance add-on", price: 499 },
  { name: "Bubble wrap protection", price: 299 },
  { name: "OS Installation / Upgrade", price: 399 },
  { name: "Thermal Paste Replacement", price: 199 },
  { name: "RAM Upgrade (8GB)", price: 1499 },
  { name: "SSD Upgrade (512GB)", price: 2499 }
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const titleParam = searchParams.get("title");
  const priceParam = searchParams.get("price");
  const packageParam = searchParams.get("package");
  const addonsParam = searchParams.get("addons");

  const [currentStep, setCurrentStep] = useState(0);
  const [paid, setPaid] = useState(false);
  
  const [bookingDetails, setBookingDetails] = useState({
    date: "17 May 2026",
    time: "11:00 AM",
    address: "123 Luxury Ave, Suite 405, Manhattan, NY 10001",
    service: titleParam || "Whole Home Deep Cleaning",
    price: priceParam || "499",
    package: packageParam || "Standard",
    addons: addonsParam || ""
  });

  useEffect(() => {
    if (titleParam || priceParam || packageParam || addonsParam) {
      setBookingDetails((prev) => ({
        ...prev,
        service: titleParam || prev.service,
        price: priceParam || prev.price,
        package: packageParam || prev.package,
        addons: addonsParam || prev.addons
      }));
    }
  }, [titleParam, priceParam, packageParam, addonsParam]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const addonsArray = bookingDetails.addons ? bookingDetails.addons.split(",").filter(Boolean) : [];
  const selectedAddonsData = addonsArray.map(name => {
    const match = allAddons.find(a => a.name === name);
    return match ? match : { name, price: 199 };
  });

  const addonSum = selectedAddonsData.reduce((sum, item) => sum + item.price, 0);

  // Dynamic pricing breakdown
  const subtotal = parseInt(bookingDetails.price, 10) || 499;
  const baseAndAddons = subtotal + addonSum;
  const gst = Math.round(baseAndAddons * 0.18);
  const servicesTax = Math.round(baseAndAddons * 0.05);
  const otherTaxes = Math.round(baseAndAddons * 0.025);
  const finalPrice = baseAndAddons + gst + servicesTax + otherTaxes;

  const handlePay = () => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      service: bookingDetails.service,
      date: bookingDetails.date,
      time: bookingDetails.time,
      status: "Confirmed",
      price: String(finalPrice),
      address: bookingDetails.address
    };

    const savedBookings = localStorage.getItem("userBookings");
    let updated = savedBookings ? JSON.parse(savedBookings) : [];
    updated.unshift(newBooking);
    localStorage.setItem("userBookings", JSON.stringify(updated));

    setPaid(true);
  };

  if (paid) return <PaymentSuccess bookingDetails={{ ...bookingDetails, price: String(finalPrice) }} />;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
               <Link 
                 href="/services"
                 className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
               >
                 <ArrowLeft className="h-5 w-5" />
               </Link>
               <h1 className="text-2xl font-bold tracking-tight">Booking Checkout</h1>
            </div>
            
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
             <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                   <motion.div
                     key={currentStep}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="space-y-6"
                   >
                     {currentStep === 0 && <StepService next={nextStep} service={bookingDetails.service} packageType={bookingDetails.package} />}
                     {currentStep === 1 && (
                       <StepSchedule 
                         next={nextStep} 
                         prev={prevStep} 
                         details={bookingDetails} 
                         setDetails={setBookingDetails} 
                       />
                     )}
                     {currentStep === 2 && (
                       <StepAddress 
                         next={nextStep} 
                         prev={prevStep} 
                         details={bookingDetails} 
                         setDetails={setBookingDetails} 
                       />
                     )}
                     {currentStep === 3 && <StepPayment prev={prevStep} onPay={handlePay} price={String(finalPrice)} />}
                   </motion.div>
                </AnimatePresence>
             </div>

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
                               <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800" alt="Svc" fill className="object-cover" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-sm font-bold line-clamp-1">{bookingDetails.service}</h4>
                              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{bookingDetails.package} Package</p>
                           </div>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="space-y-2 text-sm">
                           <div className="flex justify-between">
                              <span className="text-muted-foreground">Base Price ({bookingDetails.package})</span>
                              <span className="font-medium">Rs. {subtotal}</span>
                           </div>

                           {selectedAddonsData.map((item) => (
                             <div key={item.name} className="flex justify-between font-medium">
                                <span className="text-muted-foreground">{item.name} (Sub-Service)</span>
                                <span>Rs. {item.price}</span>
                             </div>
                           ))}

                           <div className="flex justify-between">
                              <span className="text-muted-foreground">GST (18%)</span>
                              <span className="font-medium">Rs. {gst}</span>
                           </div>
                           <div className="flex justify-between">
                              <span className="text-muted-foreground">Services Tax (5%)</span>
                              <span className="font-medium">Rs. {servicesTax}</span>
                           </div>
                           <div className="flex justify-between">
                              <span className="text-muted-foreground">Local / Other Tax (2.5%)</span>
                              <span className="font-medium">Rs. {otherTaxes}</span>
                           </div>
                           <div className="flex justify-between">
                              <span className="text-muted-foreground">Platform Fee</span>
                              <span className="font-medium">Rs. 49</span>
                           </div>
                           <div className="flex justify-between text-emerald-500 font-bold">
                              <span>Discount (PROMO20)</span>
                              <span>-Rs. 49</span>
                           </div>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="flex justify-between items-center text-lg font-bold">
                           <span>Total</span>
                           <span className="text-gradient font-black">Rs. {finalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="rounded-xl bg-slate-100 p-3 text-[10px] text-muted-foreground dark:bg-slate-900">
                         All calculations are based on standard Indian marketplace tax structures.
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-bold">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

const StepService = ({ next, service, packageType }: { next: () => void; service: string; packageType: string }) => (
  <Card className="p-6 space-y-6">
     <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">Review Package</h2>
        <p className="text-sm text-muted-foreground">Confirm your service details before scheduling.</p>
     </div>
     <div className="rounded-xl border p-4 space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="font-bold">{service}</h3>
           <Badge variant="outline" className="border-primary text-primary capitalize">{packageType}</Badge>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
           <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" /> Professional Partners</li>
           <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" /> Complete service guarantee</li>
           <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" /> Fully custom selected package</li>
        </ul>
     </div>
     <Button onClick={next} className="w-full h-12 rounded-xl gradient-primary font-bold">Confirm and Continue</Button>
  </Card>
);

const StepSchedule = ({ next, prev, details, setDetails }: any) => {
  const dates = ["17 May 2026", "18 May 2026", "19 May 2026", "20 May 2026", "21 May 2026"];
  const slots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"];

  return (
    <Card className="p-6 space-y-6">
       <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight">Schedule Service</h2>
          <p className="text-sm text-muted-foreground">Pick a date and time slot that works best for you.</p>
       </div>
       
       <div className="space-y-3">
          <h3 className="text-sm font-bold">Select Date</h3>
          <div className="grid grid-cols-5 gap-2">
             {dates.map((d) => (
               <button 
                 key={d} 
                 onClick={() => setDetails((prevDetails: any) => ({ ...prevDetails, date: d }))}
                 className={`flex flex-col items-center justify-center rounded-xl border p-3 transition-all ${
                   details.date === d ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20 font-bold" : "hover:border-primary"
                 }`}
               >
                  <span className="text-[10px] font-bold uppercase opacity-60">May</span>
                  <span className="text-lg font-black">{d.split(' ')[0]}</span>
               </button>
             ))}
          </div>
       </div>

       <div className="space-y-3">
          <h3 className="text-sm font-bold">Available Slots</h3>
          <div className="grid grid-cols-2 gap-2">
             {slots.map((t) => (
               <button 
                 key={t} 
                 onClick={() => setDetails((prevDetails: any) => ({ ...prevDetails, time: t }))}
                 className={`rounded-lg border p-3 text-sm font-bold hover:border-primary transition-all ${
                   details.time === t ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20" : ""
                 }`}
               >
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
};

const StepAddress = ({ next, prev, details, setDetails }: any) => {
  const [locating, setLocating] = useState(false);

  const detectLocation = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        setDetails((prevDetails: any) => ({
          ...prevDetails,
          address: `Latitude: ${lat}, Longitude: ${lon} (Auto-detected near Bangalore)`
        }));
        setLocating(false);
      },
      () => {
        alert("Failed to capture geo-location. Please check your browser permissions.");
        setLocating(false);
      }
    );
  };

  return (
    <Card className="p-6 space-y-6">
       <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight">Service Address</h2>
          <p className="text-sm text-muted-foreground">Where should we send our professionals?</p>
       </div>
       <div className="space-y-4">
          <div className="space-y-2">
             <label className="text-sm font-bold">Full Address and Details</label>
             <div className="flex gap-2">
                <div className="relative flex-1">
                   <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                   <Input 
                      value={details.address}
                      onChange={(e) => setDetails((prevDetails: any) => ({ ...prevDetails, address: e.target.value }))}
                      placeholder="Your street address" 
                      className="pl-10 h-12 rounded-xl flex-1"
                      required 
                   />
                </div>
                <Button 
                   type="button" 
                   onClick={detectLocation}
                   disabled={locating}
                   className="h-12 rounded-xl gradient-primary font-bold px-4 shrink-0 flex gap-2"
                >
                   <Navigation className="h-4 w-4" />
                   {locating ? "Locating..." : "Auto Detect"}
                </Button>
             </div>
             <p className="text-[10px] text-muted-foreground">Coordinates are captured via the browser Geolocation API.</p>
          </div>
       </div>
       <div className="flex gap-4">
          <Button onClick={prev} variant="outline" className="flex-1 h-12 rounded-xl">Back</Button>
          <Button onClick={next} className="flex-[2] h-12 rounded-xl gradient-primary font-bold">Proceed to Payment</Button>
       </div>
    </Card>
  );
};

const StepPayment = ({ prev, onPay, price }: { prev: () => void; onPay: () => void; price: string }) => {
  const [selected, setSelected] = useState("upi");
  const methods = [
    { id: "upi", label: "UPI (GPay / PhonePe / Paytm)", icon: Smartphone, sub: "Instant payment via any UPI app" },
    { id: "card", label: "Credit / Debit Card", icon: CreditCard, sub: "Visa, Mastercard, RuPay" },
    { id: "netbanking", label: "Net Banking", icon: Wifi, sub: "All major Indian banks supported" },
    { id: "cash", label: "Cash After Service", icon: IndianRupee, sub: "Pay in cash when work is done" },
  ];
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">Complete Payment</h2>
        <p className="text-sm text-muted-foreground">Select your preferred payment method.</p>
      </div>
      <div className="space-y-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all hover:border-primary ${
              selected === method.id ? "border-primary bg-primary/5 ring-2 ring-primary/20 font-bold" : ""
            }`}
          >
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted shrink-0">
              <method.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">{method.label}</p>
              <p className="text-[11px] text-muted-foreground">{method.sub}</p>
            </div>
            {selected === method.id && <Check className="h-5 w-5 text-primary shrink-0" />}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <Button onClick={prev} variant="outline" className="flex-1 h-12 rounded-xl">Back</Button>
        <Button
          onClick={onPay}
          className="flex-[2] h-12 rounded-xl gradient-primary font-bold text-lg shadow-xl"
        >
          Confirm and Pay Rs. {price}
        </Button>
      </div>
    </Card>
  );
};

const PaymentSuccess = ({ bookingDetails }: any) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full space-y-8"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </div>
        <PartyPopper className="h-8 w-8 text-amber-500 animate-bounce" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Booking Confirmed!</h1>
        <p className="text-muted-foreground">
          Your payment of <strong>Rs. {bookingDetails.price}</strong> was received successfully. A confirmation has been sent to your registered email.
        </p>
      </div>
      <Card className="border-2 border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-900 shadow-lg text-left">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Booking ID</span>
            <span className="font-bold">#OSM-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service</span>
            <span className="font-bold">{bookingDetails.service}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Scheduled</span>
            <span className="font-bold">{bookingDetails.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Time Slot</span>
            <span className="font-bold">{bookingDetails.time}</span>
          </div>
          <div className="flex flex-col text-sm pt-2 border-t">
            <span className="text-muted-foreground mb-0.5">Address</span>
            <span className="font-bold text-xs">{bookingDetails.address}</span>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-3">
         <Link href="/dashboard/bookings">
            <Button className="w-full h-12 rounded-xl gradient-primary font-bold shadow-lg">
               View My Bookings
            </Button>
         </Link>
         <Link href="/">
            <Button variant="ghost" className="w-full h-12 rounded-xl font-semibold">
               Return Home
            </Button>
         </Link>
      </div>
    </motion.div>
  </div>
);
