import {  Video, Users, BellRing } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="container pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card/80 border border-primary/15 p-6 rounded-[20px]">
          <div className="mb-4 ">
            <BellRing className="h-8 w-8 text-primary"/>
          </div>
          <h3 className="text-white font-medium mb-2">Instant incident updates</h3>
          <p className="text-primary/75 text-sm">
            Receive prompt notifications tailored to patrol activity, access checks, and urgent events.
          </p>
        </div>
        <div className="bg-card/80 border border-primary/15 p-6 rounded-[20px]">
          <div className="mb-4">
            <Video className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-white font-medium mb-2">Secure footage access</h3>
          <p className="text-primary/75 text-sm">
            Review saved video quickly with searchable records and intelligent anomaly spotting.
          </p>
        </div>
        <div className="bg-card/80 border border-primary/15 p-6 rounded-[20px]">
          <div className="mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-white font-medium mb-2">Vetted field teams</h3>
          <p className="text-primary/75 text-sm">
            Work with screened professionals supported by dependable tracking and reporting tools.
          </p>
        </div>
      </div>
    </section>
  );
}
