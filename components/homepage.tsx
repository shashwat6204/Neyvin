"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";
import CompanyLogo from "@/public/images/neyvinLogo.jpg";

const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
];

const HeroTitle = ({ theme }: { theme: string }) => (
  <div className="flex flex-col items-center sm:items-start">
    <div className="flex items-center space-x-2 mb-2">
      <span className="text-2xl sm:text-3xl font-semibold text-primary-700">
        Neyvin Technologies
      </span>
    </div>
    <h1 className="text-3xl sm:text-5xl font-bold text-center sm:text-left leading-tight">
      Transforming Businesses Through People & Technology
    </h1>
  </div>
);

const HeroDescription = () => (
  <div className="mt-6 max-w-2xl text-center sm:text-left">
    <p className="text-gray-600 text-base sm:text-lg" data-aos="fade-up">
      Strategic HR consulting, payroll management, and innovative tech solutions – all under one roof. 
      We help you scale efficiently while maintaining excellence.
    </p>
  </div>
);

const HeroImage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('next');
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full md:w-1/2 mt-10 sm:mt-28 sm:ml-12 px-4 sm:px-0">
      <div className="relative w-full aspect-[16/10] max-w-2xl mx-auto">
        {/* Glass Effect Container */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-background to-primary/5 rounded-[2rem] blur-2xl" />
        
        {/* Main Slideshow Container */}
        <div className="relative h-full rounded-xl overflow-hidden bg-background/5 backdrop-blur-sm border border-white/10">
          {/* Images */}
          <div className="relative w-full h-full">
            {images.map((img, index) => (
              <div
                key={img}
                className={`absolute inset-0 transition-transform duration-700 ease-out ${
                  index === currentImage ? 'translate-x-0 opacity-100' :
                  direction === 'next' ? 
                    (index === (currentImage + 1) % images.length ? 'translate-x-full opacity-0' : 'translate-x-full opacity-0') :
                    (index === (currentImage - 1 + images.length) % images.length ? '-translate-x-full opacity-0' : '-translate-x-full opacity-0')
                }`}
              >
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Homepage() {
  const { theme } = useTheme();

  return (
    <section className="flex flex-col md:flex-row items-center justify-between mx-8 sm:mx-20">
      <div className="relative md:w-1/2 mt-24 max-w-6xl sm:px-6">
        <div className="relative pb-16 pt-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center sm:items-start sm:text-left">
            <HeroTitle theme={theme!} />
            <HeroDescription />
          </div>
        </div>
      </div>

      <HeroImage />
    </section>
  );
}
