import ManpowerRecruitmentPage from "@/components/manpower-recruitment";
import { constructMetadata } from "../../../lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Manpower Recruitment",
  description: "Comprehensive staffing and recruitment solutions for your organization",
  canonical: "/services/manpower-recruitment",
});

export default function ManpowerRecruitment() {
  return (
    <>
      <ManpowerRecruitmentPage />
    </>
  );
}
