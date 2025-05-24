"use client";

import {
  Lightbulb,
  TrendingUp,
  BarChart4,
  Settings2,
  Users2,
  Brain,
  Network,
  LineChart,
  Laptop2,
  Building2,
  Workflow,
  Boxes
} from "lucide-react";
import ServicePageLayout from "./shared/service-page-layout";
import Section from "./shared/section";
import FeatureCard from "./shared/feature-card";

const consultingServices = [
  {
    title: "Strategy Consulting",
    icon: Lightbulb,
    description: "Develop winning strategies and roadmaps for sustainable growth",
    features: [
      {
        title: "Market Analysis",
        description: "In-depth market research and competitive analysis to identify opportunities"
      },
      {
        title: "Growth Strategy",
        description: "Develop scalable business models and expansion strategies"
      },
      {
        title: "Digital Strategy",
        description: "Navigate digital transformation and technology adoption"
      }
    ]
  },
  {
    title: "IT Consulting",
    icon: Laptop2,
    description: "Expert guidance on technology implementation and optimization",
    features: [
      {
        title: "Technology Assessment",
        description: "Evaluate current systems and recommend improvements"
      },
      {
        title: "Digital Transformation",
        description: "Guide organizations through technological change"
      },
      {
        title: "IT Strategy",
        description: "Align technology initiatives with business objectives"
      }
    ]
  },
  {
    title: "Operations Consulting",
    icon: Settings2,
    description: "Optimize business processes and operational efficiency",
    features: [
      {
        title: "Process Optimization",
        description: "Streamline workflows and eliminate inefficiencies"
      },
      {
        title: "Quality Management",
        description: "Implement quality control systems and best practices"
      },
      {
        title: "Cost Reduction",
        description: "Identify and execute cost optimization strategies"
      }
    ]
  }
];

const methodologySteps = [
  {
    icon: Brain,
    title: "Discovery & Analysis",
    description: "Comprehensive assessment of current state and challenges"
  },
  {
    icon: TrendingUp,
    title: "Strategy Development",
    description: "Creating tailored solutions and actionable roadmaps"
  },
  {
    icon: Workflow,
    title: "Implementation",
    description: "Executing strategies with precision and adaptability"
  },
  {
    icon: LineChart,
    title: "Monitoring & Optimization",
    description: "Continuous improvement and performance tracking"
  }
];

const benefits = [
  {
    icon: Building2,
    title: "Business Growth",
    description: "Accelerate growth through strategic initiatives and market expansion"
  },
  {
    icon: Network,
    title: "Digital Innovation",
    description: "Leverage cutting-edge technologies for competitive advantage"
  },
  {
    icon: Users2,
    title: "Team Excellence",
    description: "Build high-performing teams and optimize organizational structure"
  },
  {
    icon: BarChart4,
    title: "Performance Improvement",
    description: "Enhance operational efficiency and business performance"
  },
  {
    icon: Boxes,
    title: "Process Optimization",
    description: "Streamline operations and improve business processes"
  },
  {
    icon: TrendingUp,
    title: "Sustainable Growth",
    description: "Develop strategies for long-term success and scalability"
  }
];

export default function BusinessConsultingPage() {
  return (
    <ServicePageLayout
      hero={{
        title: "Business Consulting Services",
        description: "Strategic guidance and expert solutions to drive your business forward"
      }}
    >
      {/* Services Section */}
      <Section
        title="Our Consulting Services"
        description="Comprehensive consulting solutions tailored to your business needs"
        variant="alternate"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {consultingServices.map((service, index) => (
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
                  <div key={idx} className="space-y-2 group/feature">
                    <h4 className="text-lg font-semibold text-foreground group-hover/feature:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Methodology Section */}
      <Section
        title="Our Methodology"
        description="A proven approach to delivering exceptional results"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methodologySteps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {index < methodologySteps.length - 1 && (
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
        title="Benefits of Our Consulting"
        description="Drive transformational change and achieve sustainable growth"
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