import ProjectManagementPage from "@/components/project-management";
import { constructMetadata } from "../../../lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Project Management",
  description: "Service page for Manpower Recruitment Project Management",
  canonical: "/services/project-management",
});

export default function ProjectManagement() {
  return (
    <>
      <ProjectManagementPage />
    </>
  );
}
