import AboutBanner from "@/components/about/banner";
import Leader from "@/components/about/leader";
import Mission from "@/components/about/mission";

import React from "react";

export default function page() {
  return (
    <main>
      <AboutBanner />
      <div id="mission">
        <Mission />
      </div>
      
      <div>
      <Leader />
     </div>
      {/* <Process /> */}
    </main>
  );
}
