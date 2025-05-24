"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  className?: string;
  index?: number;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color = "primary",
  className,
  index = 0
}: FeatureCardProps) {
  return (
    <motion.div
      className={`bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-border/50 hover:border-primary/50 transition-colors ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className={`text-${color} mb-4`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
} 