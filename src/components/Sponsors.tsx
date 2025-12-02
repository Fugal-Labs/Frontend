export default function Sponsors() {
  // Placeholder sponsors - will be replaced with actual logos later
  const sponsors = [
    { name: "Sponsor 1", tier: "platinum" },
    { name: "Sponsor 2", tier: "platinum" },
    { name: "Sponsor 3", tier: "gold" },
    { name: "Sponsor 4", tier: "gold" },
    { name: "Sponsor 5", tier: "silver" },
    { name: "Sponsor 6", tier: "silver" },
  ];

  return (
    <section id="sponsors" className="py-16 sm:py-20 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Our <span className="text-[#ff2c2c]">Sponsors</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#bbbbbb] max-w-2xl mx-auto px-2">
            Powered by amazing companies who believe in fostering innovation and
            supporting the developer community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-[#ff2c2c]/20 hover:border-[#ff2c2c]/50 transition-all hover:scale-105 active:scale-100 flex items-center justify-center aspect-video"
            >
              <div className="text-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-2 sm:mb-4 bg-linear-to-br from-[#ff2c2c]/20 to-[#ff2c2c]/5 rounded-lg sm:rounded-xl flex items-center justify-center border border-[#ff2c2c]/30">
                  <span className="text-[#ff2c2c] font-bold text-sm sm:text-base md:text-lg">
                    LOGO
                  </span>
                </div>
                <p className="text-[#bbbbbb] text-xs sm:text-sm font-semibold">
                  {sponsor.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <p className="text-[#bbbbbb] mb-4 sm:mb-6 text-sm sm:text-base">
            Interested in sponsoring?
          </p>
          <a
            href="mailto:sponsors@fugallabs.com"
            className="inline-block bg-linear-to-r from-[#ff2c2c] to-[#cc0000] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:opacity-90 active:scale-95 transition-all"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
