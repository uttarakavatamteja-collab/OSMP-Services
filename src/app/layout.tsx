import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { BottomNav } from "@/components/shared/BottomNav";
import { Toaster } from "@/components/ui/sonner";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OSM Services | On-demand services made simple",
  description: "Modern marketplace for home & professional services. Book trusted experts for cleaning, maintenance, salon, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground antialiased`}>
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
        <Toaster />
        
        {/* Floating Chat Support */}
        <div className="fixed bottom-20 right-4 z-50 md:bottom-8 md:right-8">
           <Button size="icon" className="h-14 w-14 rounded-full gradient-primary shadow-xl shadow-primary/20 hover:scale-110 transition-transform">
              <MessageCircle className="h-6 w-6 text-white" />
           </Button>
        </div>
      </body>
    </html>
  );
}
