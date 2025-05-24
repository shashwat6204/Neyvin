// app/contact/page.tsx
import ContactForm from "@/components/contact";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us",
  description: "Get in touch with Neyvin Technologies",
  canonical: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactForm />
    </>
  );
}
