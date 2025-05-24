import Features from "@/components/features";
import Homepage from "@/components/homepage";
import TryNeyvin from "@/components/tryNeywin";
import ServiceSection from "@/components/service";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  canonical: "/",
});

export default function Home() {
  return (
    <>
      <Homepage />
      <Features />
      <ServiceSection />
      <TryNeyvin />
    </>
  );
}
