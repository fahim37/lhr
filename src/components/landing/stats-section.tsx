import {Lock, Shield, TrendingUp } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="pb-5 ">
      <div className="grid grid-cols-1 md:grid-cols-3 h-[50px]   ">
        <div
          className={`bg-card/80 border border-primary/15 p-2 flex items-center gap-3 rounded-tl-[8px] rounded-bl-[8px] `}
        >
          <div className="p-2  rounded-full">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <span className="text-white text-[12px]">Secure client records</span>
        </div>
        <div className="bg-card/80 border-y border-primary/15 p-2 flex items-center gap-3">
          <div className="p-2  rounded-full">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="text-white text-[12px]">Protected communications</span>
        </div>
        <div
          className={`bg-card/80 border border-primary/15 p-2 flex items-center gap-3 rounded-tr-[8px] rounded-br-[8px]`}
        >
          <div className="p-2  rounded-full">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <span className="text-white text-[12px]">Trusted local coverage</span>
        </div>
      </div>
    </section>
  );
}
