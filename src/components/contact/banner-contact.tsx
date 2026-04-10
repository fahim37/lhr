import { Button } from "@/components/ui/button";

export default function ContactBanner() {
  return (
    <section
      className="py-20 sm:py-28 md:py-36 lg:py-48 relative after:absolute after:h-full after:w-full after:top-0 after:left-0 after:content-[''] after:bg-[#091057] after:opacity-40 after:-z-10 z-20 h-[550px]"
      style={{
        backgroundImage: "url(/assets/contact/banner.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[120%] font-bold text-[#F7E39F] pb-4 sm:pb-6 md:pb-8">
            24/7 Emergency Support
          </h1>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-[120%] font-bold text-[#F7E39F] pb-8 sm:pb-12 md:pb-16">
            Immediate Assistance? Call Now:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Button className="text-[14px] sm:text-[16px] w-full sm:w-auto h-[52px] text-[#091057]">
              Call Now: (214) 531 6256
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
