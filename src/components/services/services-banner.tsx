import { Button } from "@/components/ui/button";
import { Lock,  Shield, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ServicesBanner() {
  return (
    <section
      className="relative py-20 sm:py-28 md:py-36 lg:py-48 after:absolute after:h-full after:w-full after:top-0 after:left-0 after:content-[''] after:bg-[#091057] after:opacity-40 after:-z-10 z-20 h-[550px]"
      style={{
        backgroundImage: "url(/assets/services/serv-banner.jpeg)", // Ensure this path is correct
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto relative z-30">
        <div className="">
          <h1 className="text-[28px] sm:text-[32px] md:text-[40px] leading-[120%] font-bold text-[#F7E39F] pb-4 sm:pb-6 md:pb-8">
            24/7 Professional Security Solutions
          </h1>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-[120%] font-[500] text-[#F7E39F] pb-8 sm:pb-12 md:pb-16">
            Protect Your Home or Business with Expert Monitoring, Rapid
            Response, and Smart Tech
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-8">
            <Link href="/dashboard">
              
            <Button className="text-[14px] sm:text-[16px] w-full sm:w-auto h-[52px] bg-[#F7E39F] text-[#091057]">
              Get Started
            </Button>
            </Link>
          
          </div>
        </div>
        <div className="w-full py-3 bg-[#FFFFFF1A] bg-opacity-50 text-white flex items-center justify-around text-xs sm:text-sm my-10 rounded-[8px]">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 mr-1" />
            
            GDPR Compliant
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 mr-1" />
            AES-256 Encryption
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 mr-1" />
            98% Client Retention
          </div>
        </div>
      </div>
    </section>
  );
}
