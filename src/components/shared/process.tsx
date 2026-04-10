import { ArrowRight } from "lucide-react";

export default function Process() {
  const steps = [
    { number: 1, title: "Consultation" },
    { number: 2, title: "Assessment" },
    { number: 3, title: "Planning" },
    { number: 4, title: "Implementation" },
    { number: 5, title: "Monitoring" },
  ];

  return (
    <section className="pt-16">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-[40px] font-bold text-[#F7E39F] pb-8">
            How It Works
          </h2>
        </div>
        <div className="w-full bg-[#0a1155] py-8 px-4 md:py-12 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="flex flex-col md:flex-row items-center mb-6 md:mb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f8e9a1] text-[#0a1155] font-bold text-xl">
                      {step.number}
                    </div>
                    <div className="text-white mt-2 text-center font-medium">
                      {step.title}
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden md:flex items-center mx-2 md:mx-4 lg:mx-8 text-white">
                      <div className="border-t-2 border-dashed w-8 md:w-12 lg:w-16 border-white"></div>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}

                  {index < steps.length - 1 && (
                    <div className="flex md:hidden items-center my-4 text-white rotate-90">
                      <div className="border-t-2 border-dashed w-4 border-white"></div>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
