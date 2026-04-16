"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VerifyPage() {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 dark:bg-slate-950">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm"
      >
        <Card className="border-none shadow-2xl shadow-primary/5 bg-white/70 backdrop-blur-xl dark:bg-black/50 overflow-hidden">
           <div className="h-2 w-full gradient-primary" />
           <CardHeader className="space-y-1 text-center pt-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                 <ShieldCheck className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-black">Verify your email</CardTitle>
              <CardDescription>We&apos;ve sent a 6-digit code to <span className="font-bold text-foreground">jo**@example.com</span></CardDescription>
           </CardHeader>
           <CardContent className="space-y-8 pb-10">
              
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Input 
                    key={i} 
                    className="h-12 w-12 rounded-xl text-center text-xl font-bold border-2 focus:border-primary focus:ring-primary/20"
                    maxLength={1}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <Button className="w-full h-12 rounded-xl gradient-primary font-bold text-lg shadow-lg shadow-primary/20 group">
                   Confirm Verification
                   <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <div className="text-center space-y-2">
                   <p className="text-xs text-muted-foreground">Didn&apos;t receive the code?</p>
                   {timer > 0 ? (
                     <p className="text-xs font-bold text-primary">Resend code in {timer}s</p>
                   ) : (
                     <button className="flex items-center gap-2 mx-auto text-xs font-bold text-primary hover:underline">
                        <RefreshCw className="h-3 w-3" /> Resend Now
                     </button>
                   )}
                </div>
              </div>

              <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                 <Link href="/signup" className="hover:text-primary">Back to Sign Up</Link>
              </p>
           </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
