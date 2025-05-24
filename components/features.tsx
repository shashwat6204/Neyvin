"use client";

import { motion } from "framer-motion";
import {
  Award,
  Globe2,
  Users2,
  Rocket,
  Shield,
  Target
} from "lucide-react";

const features = [
  {
    title: "Growing Global Presence",
    description: "Expanding our services across India, US, UK, UAE, Europe, Middle East, and Africa.",
    icon: Globe2
  },
  {
    title: "Diverse Industry Solutions",
    description: "Specialized in strategy, operations, technology services, and digital transformation.",
    icon: Award
  },
  {
    title: "Client-Centric Approach",
    description: "Focused on overcoming barriers in technology, finance, and manpower consulting.",
    icon: Target
  },
  {
    title: "Digital Innovation",
    description: "Delivering technology-enabled services and digital transformation solutions.",
    icon: Rocket
  },
  {
    title: "Strategic Partnership",
    description: "Building strong relationships through transparency and practical solutions.",
    icon: Shield
  },
  {
    title: "Diverse Professional Team",
    description: "Expert professionals with unique backgrounds in recruitment & people analytics.",
    icon: Users2
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Why Choose Neyvin Technologies
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Founded in 2022, we believe in the power of diverse teaming to solve complex problems and drive change for our clients through practical and innovative approaches.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative px-8 ${
                index % 3 === 1 ? 'md:translate-y-8' : 
                index % 3 === 2 ? 'md:translate-y-16' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Connector Lines */}
              {index < features.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-px bg-border transform -rotate-45" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
