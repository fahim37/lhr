import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="container pb-16">
      <div className="bg-card/80 border border-primary/15 rounded-[20px] p-8 text-center">
        <h2 className="text-[28px] md:text-[48px] font-bold text-white mb-2">
          Need support right away?
        </h2>
        <p className="text-primary mb-6 text-[20px]">Our response line stays open 24/7.</p>
        <Link href="/dashboard">   
        <Button
          variant="outline"
          className="border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground mb-4"
        >
          Request Priority Visit
        </Button>
        </Link>
      </div>
    </section>
  );
}
