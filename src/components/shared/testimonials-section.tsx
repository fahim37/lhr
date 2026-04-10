"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  title: string;
  content: string;
  author: string;
  role: string;
  location: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      title: "Our block feels better protected",
      content:
        "Since bringing Royal House Check into the neighborhood, we have felt a noticeable difference. The patrol presence discourages problems early, and the officers carry themselves with real professionalism.",
      author: "Sarah L.",
      role: "Homeowner",
      location: "Greensboro, NC",
    },
    {
      id: 2,
      title: "Dependable when it counts",
      content:
        "We had a late-night situation near the house that did not feel right. Royal House Check responded quickly, handled it seriously, and gave us far more confidence afterward.",
      author: "Myesha J",
      role: "Resident",
      location: "Greensboro, NC",
    },
    {
      id: 3,
      title: "Consistent and thorough service",
      content:
        "The officers arrive on time, work carefully, and leave clear reports behind. That follow-through helps us stay aware of anything unusual without guessing.",
      author: "Linda M.",
      role: "Property Manager",
      location: "Winston-Salem, NC",
    },
    {
      id: 4,
      title: "Coverage shaped around our needs",
      content:
        "Their team took time to understand our community and built a plan around how we actually operate. The flexibility has been one of the strongest parts of the service.",
      author: "Marty T.",
      role: "HOA President",
      location: "Greensboro, NC",
    },
    {
      id: 5,
      title: "Easy to reach and easy to work with",
      content:
        "Whenever we need to adjust a patrol schedule or ask a question, the support team is responsive and practical. It feels like they take the relationship seriously.",
      author: "Emily K.",
      role: "Business Owner",
      location: "Winston-Salem, NC",
    },
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !api) return;

    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api, isMounted]);

  return (
    <section className="pt-5 pb-16">
      <div className="container mx-auto ">
        <h2 className="text-[40px] font-bold text-primary text-center mb-12">
          Trusted by the people we protect
        </h2>

        <Carousel
          setApi={setApi}
          className="w-full mx-auto"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4">
                <div className="bg-card/80 border border-primary/15 rounded-xl p-8 md:p-12 relative select-none">
                  <div className="absolute top-8 left-8 text-primary opacity-30">
                    <Quote size={60} />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                      {testimonial.title}
                    </h3>
                    <p className="text-white text-lg md:text-xl mb-8 italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex flex-col">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.author}
                      </span>
                      <span className="text-primary/75">
                        {testimonial.role}, {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-center gap-2 mt-6">
            <CarouselPrevious className="static transform-none bg-transparent border-none hover:bg-transparent text-primary hover:text-primary/80" />
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-primary w-6" : "bg-primary/25"
                  }`}
                />
              ))}
            </div>
            <CarouselNext className="static transform-none bg-transparent border-none hover:bg-transparent text-primary hover:text-primary/80" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
