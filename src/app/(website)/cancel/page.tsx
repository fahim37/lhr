"use client";

import React, { useEffect, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Wrap the content that uses useSearchParams in a separate component
const PaymentStatusContent = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/status-check/${sessionId}`
        );
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    if (sessionId) {
      fetchPaymentStatus();
    }
  }, [sessionId]);

  return (
    <Card className="max-w-[800px] mx-auto bg-[#091057] py-10 rounded-3xl relative">
      <CardContent>
        <div className="flex justify-center items-center pb-6">
          <Image
            src={"/assets/cancel.png"}
            alt="success"
            height={1000}
            width={500}
            className="object-contain w-32 h-28"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white pb-6">
            Your payment was successful!
          </h2>
          <Button
            variant="outline"
            className="w-[248px] h-12 bg-red-500 text-base font-medium text-white border-black"
          >
            Oooops!
          </Button>
        </div>
      </CardContent>
      <Link href="/">
        <Button
          variant="outline"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFF] font-medium text-black"
        >
          <X />
        </Button>
      </Link>
    </Card>
  );
};

const Page = () => {
  return (
    <div className="pb-32 pt-44">
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentStatusContent />
      </Suspense>
    </div>
  );
};

export default Page;
