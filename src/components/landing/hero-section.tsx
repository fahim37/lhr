import Image from "next/image";
import { Button } from "@/components/ui/button";

import StatsSection from "./stats-section";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Text and Buttons */}
        <div className="flex flex-col justify-between h-full min-w-[320px] lg:min-w-[540px]">
          <div className="space-y-6">
            <h1 className="text-[28px] lg:text-[34px] xl:text-[40px] font-bold text-primary">
              Day-and-night security coverage for the places that matter most
            </h1>
            <p className="max-w-xl text-base text-primary/85 md:text-lg">
              Arrange your first property check in minutes, stay informed with live updates,
              and manage every visit from one secure dashboard.
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Link href="/dashboard">
                <Button className="px-6 bg-primary text-primary-foreground text-base font-bold hover:bg-primary/85 py-[12px] rounded-lg">
                  Book Your First Visit
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <StatsSection />
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex justify-center items-center max-w-full lg:max-w-[500px] mt-36 md:mt-0">
          <Image
            src="/assets/hero.png"
            alt="Security lock and chain"
            width={500}
            height={400}
            className="rounded-lg h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
