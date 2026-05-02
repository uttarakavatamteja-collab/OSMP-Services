"use client";

import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [role, setRole] = useState("user");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 dark:bg-slate-950">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 text-center uppercase tracking-[0.2em]">
           <Link href="/" className="inline-flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                 <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white"/>
                 </svg>
              </div>
              <span className="text-2xl font-black text-gradient">OSM</span>
           </Link>
        </div>

        <Card className="border-none shadow-2xl shadow-primary/5 bg-white/70 backdrop-blur-xl dark:bg-black/50">
           <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-black">Create Account</CardTitle>
              <CardDescription>Join OSM and start booking services today</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
              
              <Tabs defaultValue="user" className="w-full" onValueChange={setRole}>
                <TabsList className="grid w-full grid-cols-2 h-12 p-1 rounded-xl bg-muted/50">
                  <TabsTrigger value="user" className="rounded-lg font-bold data-[state=active]:gradient-primary data-[state=active]:text-white">Customer</TabsTrigger>
                  <TabsTrigger value="vendor" className="rounded-lg font-bold data-[state=active]:gradient-primary data-[state=active]:text-white">Vendor</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                 <div className="space-y-2">
                    <div className="relative">
                       <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                       <Input placeholder="Full Name" className="pl-10 h-12 rounded-xl" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="relative">
                       <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                       <Input placeholder="name@example.com" className="pl-10 h-12 rounded-xl" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="relative">
                       <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                       <Input type="password" placeholder="Create Password" className="pl-10 h-12 rounded-xl" />
                    </div>
                 </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                 <ShieldCheck className="h-5 w-5 shrink-0" />
                 <p className="text-[10px] font-bold uppercase tracking-wider">
                   {role === 'user' 
                    ? "Safe & secure booking experience guaranteed." 
                    : "Join our network of verified professionals."}
                 </p>
              </div>

              <Button className="w-full h-12 rounded-xl gradient-primary font-bold text-lg shadow-lg shadow-primary/20 group">
                 Sign Up
                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                 Already have an account?{" "}
                 <Link href="/login" className="font-bold text-primary hover:underline">Sign in</Link>
              </p>
              
              <p className="px-8 text-center text-[10px] leading-relaxed text-muted-foreground">
                 By clicking sign up, you agree to our{" "}
                 <Link href="#" className="underline">Terms of Service</Link> and{" "}
                 <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
           </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
