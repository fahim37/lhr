export default function Commitment() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-[#F7E39F] text-[40px] font-bold text-center pb-7">
          Our Commitment
        </h2>
        <div className="rounded-xl  p-6 md:p-8">
          <p className="text-white text-lg mb-6">
            We believe in building strong relationships with the communities we
            serve. Our approach is rooted in:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#FFFFFF1A]">
              <h3 className="text-xl font-bold text-[#F7E39F] pb-3">Trust</h3>
              <p className="text-white">
                Ensuring transparency and reliability in all our operations.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FFFFFF1A]">
              <h3 className="text-xl font-bold text-[#F7E39F] pb-3">
                Integrity
              </h3>
              <p className="text-white">
                Upholding the highest ethical standards in every aspect of our
                work.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FFFFFF1A]">
              <h3 className="text-xl font-bold text-[#F7E39F] pb-3">
                Responsiveness
              </h3>
              <p className="text-white">
                Being available and ready to act whenever our clients need us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
