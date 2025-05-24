"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import CompanyLogos from "./company-logos";

const services = [
  {
    title: "Business Consulting & Advisory",
    description:
      "Strategic expertise across IT, operations, HR, finance, and compliance to drive smart decisions and long-term growth.",
    href: "/services/business-consulting",
    image: "/images/img1.jpg",
  },
  {
    title: "Manpower Recruitment",
    description:
      "From permanent to global staffing, we match the right people with the right opportunities—locally and internationally.",
    href: "/services/manpower-recruitment",
    image: "/images/img2.jpg",
  },
  {
    title: "Project Management",
    description:
      "Expert-led delivery of complex projects with focus on scope, quality, time and budget – executed with precision.",
    href: "/services/project-management",
    image: "/images/img3.jpg",
  },
];

export default function ServiceSection() {
  const { theme } = useTheme();

  return (
    <>
      <section
        className="py-20 px-6 sm:px-12 lg:px-20 transition-colors duration-300 bg-background min-h-screen"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground"
          >
            Our Core Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-xl border shadow-md transition duration-300 hover:shadow-lg flex flex-col bg-card text-card-foreground"
              >
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2 text-foreground"
                  >
                    {service.title}
                  </h3>
                  <p className="text-base mb-4 flex-grow text-muted-foreground">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-4 font-medium text-primary hover:text-primary/80 transition-colors duration-300"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CompanyLogos />
    </>
  );
}
