"use client";

import { 
  ClipboardList, 
  FileSpreadsheet, 
  Target, 
  Settings, 
  CheckCircle2,
  BarChart3,
  Users,
  Calendar,
  AlertCircle,
  MessageSquare,
  Workflow,
  GitBranch
} from "lucide-react";
import ServicePageLayout from "./shared/service-page-layout";
import Section from "./shared/section";
import FeatureCard from "./shared/feature-card";

const projectPhases = [
  {
    number: 1,
    title: "Conception & Initiation",
    icon: ClipboardList,
    color: "text-blue-500",
    items: [
      "Project Charter",
      "Project Initiation",
      "Stakeholder Analysis",
      "Initial Scope Definition"
    ]
  },
  {
    number: 2,
    title: "Definition & Planning",
    icon: FileSpreadsheet,
    color: "text-yellow-500",
    items: [
      "Scope & Budget",
      "Work Breakdown Structure",
      "Gantt Chart",
      "Communication Plan",
      "Risk Management"
    ]
  },
  {
    number: 3,
    title: "Execution",
    icon: Settings,
    color: "text-blue-400",
    items: [
      "Status & Tracking",
      "KPIs",
      "Quality",
      "Forecasts"
    ]
  },
  {
    number: 4,
    title: "Performance & Control",
    icon: BarChart3,
    color: "text-green-500",
    items: [
      "Objectives",
      "Quality Deliverables",
      "Effort & Cost Tracking",
      "Performance Metrics"
    ]
  },
  {
    number: 5,
    title: "Close",
    icon: CheckCircle2,
    color: "text-purple-500",
    items: [
      "Post Mortem",
      "Project Punchlist",
      "Reporting",
      "Project Governance"
    ]
  }
];

const projectTypes = [
  {
    title: "IT Project Management",
    icon: Workflow,
    description: "Specialized project management for technology and software development initiatives",
    features: [
      {
        title: "Software Development",
        description: "End-to-end management of software development projects using Agile or Waterfall methodologies",
      },
      {
        title: "System Integration",
        description: "Coordinating and managing complex system integration projects across platforms",
      },
      {
        title: "Digital Transformation",
        description: "Leading digital transformation initiatives and technology upgrades",
      }
    ]
  },
  {
    title: "Non-IT Project Management",
    icon: GitBranch,
    description: "Comprehensive project management for business and operational projects",
    features: [
      {
        title: "Business Process Improvement",
        description: "Managing projects focused on optimizing business processes and operations",
      },
      {
        title: "Organizational Change",
        description: "Leading change management initiatives and organizational transformations",
      },
      {
        title: "Infrastructure Development",
        description: "Overseeing physical infrastructure and facility development projects",
      }
    ]
  }
];

const features = [
  {
    icon: Users,
    title: "Team Management",
    description: "Expert coordination of cross-functional teams and resources"
  },
  {
    icon: Calendar,
    title: "Timeline Management",
    description: "Strict adherence to project schedules and milestones"
  },
  {
    icon: AlertCircle,
    title: "Risk Management",
    description: "Proactive identification and mitigation of project risks"
  },
  {
    icon: Target,
    title: "Quality Assurance",
    description: "Rigorous quality control and assurance processes"
  },
  {
    icon: MessageSquare,
    title: "Stakeholder Communication",
    description: "Regular updates and transparent communication"
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Continuous monitoring of project KPIs and metrics"
  }
];

export default function ProjectManagementPage() {
  return (
    <ServicePageLayout
      hero={{
        title: "Project Management Services",
        description: "Expert project management solutions for both IT and Non-IT initiatives, delivered with precision and excellence"
      }}
    >
      {/* Project Lifecycle Section */}
      <Section
        title="Project Management Lifecycle"
        description="Our comprehensive approach to managing projects through five key phases"
        variant="alternate"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {projectPhases.map((phase, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-md border relative overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className={`mb-4 ${phase.color}`}>
                  <phase.icon className="w-12 h-12" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-2xl font-bold ${phase.color}`}>{phase.number}</span>
                  <h3 className="text-lg font-semibold text-foreground">{phase.title}</h3>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Project Types Section */}
      <Section
        title="Specialized Project Management"
        description="Tailored solutions for different project types and industries"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projectTypes.map((type, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-lg border group hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-primary">
                  <type.icon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{type.title}</h2>
              </div>
              <p className="text-muted-foreground mb-8">{type.description}</p>
              
              <div className="space-y-6">
                {type.features.map((feature, idx) => (
                  <div key={idx} className="space-y-2 group/feature">
                    <h3 className="text-xl font-semibold text-foreground group-hover/feature:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Key Features Section */}
      <Section
        title="Our Project Management Approach"
        description="Comprehensive project management capabilities to ensure successful delivery"
        variant="alternate"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </Section>
    </ServicePageLayout>
  );
}