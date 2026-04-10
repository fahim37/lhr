import ContactBanner from "@/components/contact/banner-contact";
import ContactSection from "@/components/contact/contact-section";
import TestimonialsSection from "@/components/shared/testimonials-section";

import React from "react";

const page = () => {
  return (
    <div>
      <ContactBanner />
      <div id="contactus">
      <ContactSection />
      </div>
      <div className="mt-5 mb-20">
        <TestimonialsSection />
      </div>
    </div>
  );
};

export default page;
