import BusinessConsultingPage from "@/components/business-consulting";
import { constructMetadata } from "../../../lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Business Consulting",
  description: "Service page for Business Consulting",
  canonical: "/services/business-consulting",
});

export default function BusinessConsulting() {
  return (
    <>
      <BusinessConsultingPage />
    </>
  );
}
