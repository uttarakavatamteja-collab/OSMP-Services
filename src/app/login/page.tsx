"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 dark:bg-slate-950">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

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
              <CardTitle className="text-2xl font-black">Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="space-y-4">
                 <div className="space-y-2">
                    <div className="relative">
                       <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                       <Input placeholder="name@example.com" className="pl-10 h-12 rounded-xl" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="relative">
                       <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                       <Input type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl" />
                    </div>
                    <div className="flex justify-end">
                       <button className="text-xs font-bold text-primary hover:underline">Forgot password?</button>
                    </div>
                 </div>
              </div>

              <Button className="w-full h-12 rounded-xl gradient-primary font-bold text-lg shadow-lg shadow-primary/20 group">
                 Sign In
                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <div className="relative">
                 <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                 </div>
                 <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-muted-foreground font-bold">Or continue with</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" className="h-12 rounded-xl font-bold">
                    <Chrome className="mr-2 h-4 w-4" /> Google
                 </Button>
                 <Button variant="outline" className="h-12 rounded-xl font-bold">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                 </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                 Don&apos;t have an account?{" "}
                 <Link href="/signup" className="font-bold text-primary hover:underline">Sign up</Link>
              </p>
           </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
