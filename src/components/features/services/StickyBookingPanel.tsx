"use client";

import { Calendar, Clock, MapPin, ChevronRight, Star } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const StickyBookingPanel = () => {
  return (
    <div className="sticky top-24 space-y-6">
      <Card className="overflow-hidden border-2 border-primary/20 shadow-xl shadow-primary/5">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Service Subtotal</span>
              <div className="text-3xl font-black">$89.00</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span>4.9</span>
              </div>
              <span className="text-[10px] text-muted-foreground">(1.2k+ reviews)</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase text-muted-foreground">Date</div>
                <div className="font-semibold">Select Date</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase text-muted-foreground">Time Slot</div>
                <div className="font-semibold">Select Slot</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Service Fee</span>
              <span>$5.00</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total Price</span>
              <span className="text-gradient">$94.00</span>
            </div>
          </div>

          <Link 
            href="/checkout"
            className={cn(buttonVariants(), "w-full h-14 rounded-xl gradient-primary text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform")}
          >
            Proceed to Booking
          </Link>

          <p className="text-[10px] text-center text-muted-foreground px-4">
            Free cancellation up to 24 hours before the service starts.
          </p>
        </CardContent>
      </Card>

      {/* Trust Badge */}
      <div className="flex items-center gap-4 rounded-xl border bg-slate-50 p-4 dark:bg-slate-900">
        <MapPin className="h-8 w-8 text-primary shrink-0" />
        <div className="space-y-1">
          <h5 className="text-xs font-bold">Verified Professional</h5>
          <p className="text-[10px] text-muted-foreground">
            All our professionals are background checked and highly rated.
          </p>
        </div>
      </div>
    </div>
  );
};
