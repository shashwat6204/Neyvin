"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServicePageLayoutProps {
  hero: {
    title: string;
    description: string;
    image?: string;
  };
  children: React.ReactNode;
  className?: string;
}

export default function ServicePageLayout({
  hero,
  children,
  className
}: ServicePageLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.05)_25%,rgba(68,68,68,.05)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.05)_75%)] bg-[length:24px_24px]" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {hero.title}
            </motion.h1>
            
            <motion.p 
              className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {hero.description}
            </motion.p>
          </div>

          {hero.image && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img 
                src={hero.image} 
                alt={hero.title}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* Content Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
} 