"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function ScheduleVisitSection() {
  const { data: session } = useSession();

  const { data: userPayment } = useQuery({
    queryKey: ["userPayment"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/check-payment-status`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      return res.json();
    },
    enabled: !!session?.accessToken,
  });

  console.log(userPayment);

  return (
    <section className="container pb-16">
      <div className="bg-card/80 border border-primary/15 rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
          <div className="relative">
            <Image
              src="/assets/visit.png"
              alt="Calendar and planning"
              width={500}
              height={400}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-4 md:space-y-[16px] flex flex-col justify-center">
            <h2 className="text-[24px] font-[600] leading-[120%] text-white">
              Plan visits around your routine
            </h2>
            <ul className="space-y-2 md:space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-primary">&bull;</span>
                <span className="text-primary/75 text-[14px] md:text-[16px]">
                  Set up one-time or recurring property checks with a clear, simple calendar.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">&bull;</span>
                <span className="text-primary/75 text-[14px] md:text-[16px]">
                  Reserve coverage from your phone without waiting on calls or email threads.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">&bull;</span>
                <span className="text-primary/75 text-[14px] md:text-[16px]">
                  Move or cancel upcoming visits whenever your schedule changes.
                </span>
              </li>
            </ul>
            <Link
              href={userPayment?.status ? "/dashboard/schedule" : "/#pricing"}
              className="w-full"
            >
              <Button className="px-6 py-3 md:px-[32px] md:py-[16px] h-[48px] md:h-[52px] w-full md:w-[220px] bg-primary text-base text-primary-foreground hover:bg-primary/85 font-medium">
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
