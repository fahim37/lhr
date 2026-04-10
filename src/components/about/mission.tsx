const Mission = () => {
  return (
    <div className=" py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="p-6 rounded-xl bg-[#FFFFFF1A]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F7E39F] text-center pb-6">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg md:text-lg font-semibold text-white pb-3 sm:pb-4 md:pb-5">
              At Royal House Check, we are dedicated to providing top-tier home
              security patrol services that ensure the safety and peace of mind
              of our clients. With a team of highly trained professionals, we
              offer proactive security solutions tailored to the unique needs of
              each neighborhood we serve.
            </p>
          </div>

          {/* Core Values Card */}
          <div className="p-6 rounded-xl bg-[#FFFFFF1A]">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F7E39F] pb-3 sm:pb-4 md:pb-5 text-center">
              Core Values
            </h3>
            <ul className="text-base sm:text-lg md:text-lg font-semibold text-white pb-3 sm:pb-4 md:pb-5 space-y-1 sm:space-y-2">
              <li>
                ✓ Integrity: Upholding the highest ethical standards in every
                aspect of our work.
              </li>
              <li>
                ✓ Vigilance: Maintaining constant awareness to proactively
                identify security threats.
              </li>
              <li>
                ✓ Professionalism: Delivering services with the utmost
                professionalism and respect.
              </li>
              <li>
                ✓ Community Commitment: Building strong relationships within
                neighborhoods we protect.
              </li>
              <li>
                ✓ Innovation: Embracing the latest security technologies and
                methodologies.
              </li>
              <li>
                ✓ Accountability: Taking full responsibility for our actions and
                services.
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline Section */}
        <div id="our-journey" className="w-full pt-12 sm:pt-16 md:pt-20">
          {/* <h2 className="text-2xl sm:text-3xl font-bold text-[#F7E39F] text-center mb-8">
            Our Journey
          </h2> */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-[#F7E39F] transform -translate-x-1/2"></div>
            <div className="flex flex-col gap-6">
              {/* Timeline Item 1 */}
              {/* <div className="flex flex-row items-center justify-between w-full">
                <div className="w-1/2 text-right pr-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#F7E39F] ">
                    2010: Foundation
                  </h3>
                  <p className="text-base sm:text-lg text-white">
                    Royal House Check is founded with a vision to provide
                    unparalleled home security.
                  </p>
                </div>
                <div className="rounded-full bg-[#F7E39F] w-4 h-4 z-10"></div>
                <div className="w-1/2"></div>
              </div> */}

              {/* Timeline Item 2 */}
              {/* <div className="flex flex-row items-center justify-between w-full">
                <div className="w-1/2"></div>
                <div className="rounded-full bg-[#F7E39F] w-4 h-4 z-10"></div>
                <div className="w-1/2 text-left pl-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#F7E39F]">
                    2015: Expansion
                  </h3>
                  <p className="text-base sm:text-lg text-white">
                    Expanded services to cover multiple neighborhoods, enhancing
                    community safety.
                  </p>
                </div>
              </div> */}

              {/* Timeline Item 3 */}
              {/* <div className="flex flex-row items-center justify-between w-full">
                <div className="w-1/2 text-right pr-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#F7E39F]">
                    2020: Technology Integration
                  </h3>
                  <p className="text-base sm:text-lg text-white">
                    Integrated advanced technology for real-time monitoring and
                    rapid response.
                  </p>
                </div>
                <div className="rounded-full bg-[#F7E39F] w-4 h-4 z-10"></div>
                <div className="w-1/2"></div>
              </div> */}

              {/* Timeline Item 4 */}
              {/* <div className="flex flex-row items-center justify-between w-full">
                <div className="w-1/2"></div>
                <div className="rounded-full bg-[#F7E39F] w-4 h-4 z-10"></div>
                <div className="w-1/2 text-left pl-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#F7E39F]">
                    2023: National Recognition
                  </h3>
                  <p className="text-base sm:text-lg text-white">
                    Received national recognition for outstanding contributions
                    to home security.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="our-services" className="w-full pt-12 sm:pt-16 md:pt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F7E39F] text-center mb-8">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#FFFFFF1A]">
              <h3 className="text-xl font-bold text-[#F7E39F] pb-3">
                Mobile Patrols
              </h3>
              <p className="text-base text-white">
                Regularly scheduled patrols to deter criminal activity and
                provide a visible security presence.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FFFFFF1A]">
              <h3 className="text-xl font-bold text-[#F7E39F] pb-3">
                Vacation Watch
              </h3>
              <p className="text-base text-white">
                Monitoring of properties while homeowners are away, providing
                reports and updates.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FFFFFF1A]">
              <h3 className="text-xl font-bold text-[#F7E39F] pb-3">
                Customized Security Plans
              </h3>
              <p className="text-base text-white">
                Tailored strategies to address specific security concerns of
                each community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
