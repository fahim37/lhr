import SecurityServices from "@/components/services/security-services";
import ServicesBanner from "@/components/services/services-banner";
import PricingSection from "@/components/shared/pricing-section";
import Process from "@/components/shared/process";
import React from "react";

const page = () => {
  return (
    <div>
      <ServicesBanner />
      <div id="security-services">
        <SecurityServices />
      </div>
      <Process />
      <div id="pricing-section">
        <PricingSection />
      </div>
    </div>
  );
};

export default page;
