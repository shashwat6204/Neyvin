import Careers from "@/components/careers";
import { constructMetadata } from "../../lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Career Opportunities | Neyvin Technologies",
  description: "Join our team at Neyvin Technologies. Explore exciting career opportunities in technology, HR, and operations. Build the future with us.",
  canonical: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <Careers />
    </>
  );
} 