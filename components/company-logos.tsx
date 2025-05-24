"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const companies = [
  { 
    name: "Tekwissen", 
    logo: "/images/companies/TekwissenLogo.jpg",
    description: "IT Services & Digital Solutions",
    link: "https://tekwissen.com"
  },
  { 
    name: "HiringHood", 
    logo: "/images/companies/HiringhoodLogo.jpg",
    description: "Recruitment & Talent Solutions",
    link: "https://hiringhood.com"
  },
  { 
    name: "Kognivera", 
    logo: "/images/companies/KogniveraLogo.jpg",
    description: "AI & Machine Learning Solutions",
    link: "https://kognivera.com"
  },
  { 
    name: "SourceFuse", 
    logo: "/images/companies/SourceFuseLogo.jpg",
    description: "Cloud & Digital Transformation",
    link: "https://sourcefuse.com"
  },
  { 
    name: "Cerebraix", 
    logo: "/images/companies/CerebraixLogo.jpg",
    description: "Enterprise Software Solutions",
    link: "https://cerebraix.com"
  },
  { 
    name: "Aheadrace", 
    logo: "/images/companies/AheadraceLogo.jpg",
    description: "Technology Innovation & Consulting",
    link: "https://aheadrace.com"
  },
  { 
    name: "Humancloud", 
    logo: "/images/companies/HumancloudLogo.jpg",
    description: "HR Technology Solutions",
    link: "https://humancloud.co.in"
  },
  { 
    name: "Anix Systems", 
    logo: "/images/companies/AnixSystemsLogo.jpg",
    description: "Software Development & Integration",
    link: "https://anixsystems.com"
  },
  { 
    name: "Square Boat", 
    logo: "/images/companies/SquareBoatLogo.jpg",
    description: "Digital Product Development",
    link: "https://squareboat.com"
  },
  { 
    name: "Epitronx", 
    logo: "/images/companies/EpitronxLogo.jpg",
    description: "Technology Solutions & Services",
    link: "https://epitronx.com"
  }
];

export default function CompanyLogos() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  // Split companies into two rows
  const splitCompanies = () => {
    const midPoint = Math.ceil(companies.length / 2);
    const firstRow = companies.slice(0, midPoint);
    const secondRow = companies.slice(midPoint);
    return { firstRow, secondRow };
  };

  const { firstRow, secondRow } = splitCompanies();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We partner with forward-thinking companies to deliver innovative solutions
          </p>
        </div>

        {/* Slider container */}
        <div className="relative w-full">
          {/* Gradient overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent"></div>

          {/* First row - moving left */}
          <div className="mb-12">
            <div className="flex space-x-12 animate-scroll hover:pause">
              {firstRow.map((company) => (
                <CompanyCard key={company.name} company={company} />
              ))}
              {/* Duplicate for seamless loop */}
              {firstRow.map((company) => (
                <CompanyCard key={`${company.name}-dup`} company={company} />
              ))}
              {firstRow.map((company) => (
                <CompanyCard key={`${company.name}-dup-2`} company={company} />
              ))}
            </div>
          </div>

          {/* Second row - moving right */}
          <div>
            <div className="flex space-x-12 animate-scroll-reverse hover:pause">
              {secondRow.map((company) => (
                <CompanyCard key={`${company.name}-rev`} company={company} />
              ))}
              {/* Duplicate for seamless loop */}
              {secondRow.map((company) => (
                <CompanyCard key={`${company.name}-rev-dup`} company={company} />
              ))}
              {secondRow.map((company) => (
                <CompanyCard key={`${company.name}-rev-dup-2`} company={company} />
              ))}
            </div>
          </div>
        </div>

        {/* Client testimonial section */}
        <div className="mt-20 text-center">
          <blockquote className="text-xl italic text-muted-foreground max-w-3xl mx-auto">
            "Neyvin Technologies has been instrumental in helping us build and scale our technology infrastructure. Their expertise and dedication are unmatched."
          </blockquote>
          <p className="mt-4 font-medium text-foreground">- CTO, Leading Technology Company</p>
        </div>
      </div>
    </section>
  );
}

// Company card component
function CompanyCard({ company }: { company: typeof companies[0] }) {
  return (
    <a
      href={company.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0"
    >
      <div className="relative w-[250px] h-[150px] transition-all duration-300 transform group-hover:scale-105">
        <div className="absolute inset-0 bg-card rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            fill
            className="object-contain p-6 transition-all duration-300"
          />
        </div>
      </div>
      
      {/* Hover information */}
      <div className="absolute -bottom-2 left-0 right-0 bg-primary/95 text-primary-foreground rounded-lg py-2 px-3 mx-2 
                   opacity-0 group-hover:opacity-100 group-hover:bottom-2 
                   transition-all duration-300 transform">
        <p className="font-medium text-sm text-center">{company.description}</p>
      </div>
    </a>
  );
} 