"use client";

import { 
  Users, 
  Building2, 
  Globe2, 
  Clock, 
  FileCheck, 
  UserCheck, 
  Briefcase, 
  Building, 
  Network, 
  UsersRound,
  Search,
  UserPlus,
  Handshake,
  Target
} from "lucide-react";
import ServicePageLayout from "./shared/service-page-layout";
import Section from "./shared/section";
import FeatureCard from "./shared/feature-card";

const staffingServices = [
  {
    title: "Corporate Staffing",
    icon: Building2,
    description: "Comprehensive staffing solutions for organizations",
    features: [
      {
        title: "RPO (Recruitment Process Outsourcing)",
        description: "Organizations need to consider various aspects of operations, finance, business and HR when making hiring decisions. Recruitment processes require different levels of expertise and a high level of focus on each specific process.",
      },
      {
        title: "Bespoke Hiring",
        description: "Every organization is confronted with the continuously evolving challenges of hiring critical positions in a market place characterized by massive demand and a dearth of appropriate talent. We help manage recruitment for unique and specific requirements in the Indian technology and knowledge services sectors.",
      }
    ]
  },
  {
    title: "Contract Staffing",
    icon: Clock,
    description: "Flexible staffing solutions for temporary and long-term needs",
    features: [
      {
        title: "Comprehensive Management",
        description: "We handle onboarding, compliance management, offer letters, and termination formalities for temporary employees.",
      },
      {
        title: "Ideal Business Sectors",
        points: [
          "IT Companies (Banking, Hospitality, Finance)",
          "Software and Hardware",
          "Non-IT Organizations (Retail, Construction, Pharma)",
          "BPO Sector (Voice/Non-Voice/Customer Support)"
        ]
      }
    ]
  },
  {
    title: "Global Recruiting",
    icon: Globe2,
    description: "International staffing solutions across borders",
    features: [
      {
        title: "Cross-Border Solutions",
        description: "Our core business is providing staffing solutions across industry sectors and diverse functional areas, focusing on IT, Finance, Sales, logistics and customer service functions across borders.",
      },
      {
        title: "International Coverage",
        points: [
          "US Staffing",
          "UK Staffing"
        ]
      }
    ]
  }
];

const recruitmentProcess = [
  {
    icon: Search,
    title: "Requirements Analysis",
    description: "Understanding your specific needs and organizational culture"
  },
  {
    icon: UserCheck,
    title: "Candidate Screening",
    description: "Rigorous evaluation process to identify top talent"
  },
  {
    icon: UserPlus,
    title: "Selection & Placement",
    description: "Matching the right candidates with your requirements"
  },
  {
    icon: Handshake,
    title: "Onboarding Support",
    description: "Ensuring smooth transition and integration"
  }
];

const benefits = [
  {
    icon: Target,
    title: "Targeted Recruitment",
    description: "Access to pre-screened, qualified candidates across industries"
  },
  {
    icon: FileCheck,
    title: "Compliance Management",
    description: "Complete handling of legal and regulatory requirements"
  },
  {
    icon: Network,
    title: "Global Network",
    description: "Access to international talent pools and markets"
  },
  {
    icon: Briefcase,
    title: "Industry Expertise",
    description: "Specialized knowledge across various business sectors"
  },
  {
    icon: Building,
    title: "Custom Solutions",
    description: "Tailored recruitment approaches for your needs"
  },
  {
    icon: UsersRound,
    title: "End-to-End Service",
    description: "Complete recruitment and management support"
  }
];

export default function ManpowerRecruitmentPage() {
  return (
    <ServicePageLayout
      hero={{
        title: "Manpower Recruitment",
        description: "Comprehensive staffing solutions tailored to your organization's unique needs"
      }}
    >
      {/* Staffing Services Section */}
      <Section
        title="Our Staffing Services"
        description="Expert staffing solutions for every business need"
        variant="alternate"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {staffingServices.map((service, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-lg border group hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-primary">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
              </div>
              <p className="text-muted-foreground mb-8">{service.description}</p>
              
              <div className="space-y-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                    {feature.points && (
                      <ul className="mt-2 space-y-1">
                        {feature.points.map((point, pidx) => (
                          <li key={pidx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Recruitment Process Section */}
      <Section
        title="Our Recruitment Process"
        description="A streamlined approach to finding and placing top talent"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recruitmentProcess.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {index < recruitmentProcess.length - 1 && (
                <div className="absolute hidden lg:block top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-y-1/2 z-0" />
              )}
              <div className="relative bg-card rounded-xl p-6 shadow-md border group-hover:border-primary/50 transition-colors z-10">
                <div className="text-primary mb-4">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section
        title="Why Choose Our Staffing Solutions"
        description="We focus on delivering value through expert recruitment services"
        variant="alternate"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <FeatureCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>
      </Section>
    </ServicePageLayout>
  );
}