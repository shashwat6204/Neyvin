// app/submit-cv/page.tsx
import SubmitCvForm from "@/components/submit-cv";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Submit Your CV",
  description: "Submit your resume for career opportunities at Neyvin",
  canonical: "/submit-cv",
});

export default function SubmitCvPage() {
  return (
    <>
      <SubmitCvForm />
    </>
  );
}
