"use client";

export default function HackathonHighlight() {
  const scrollToRegister = () => {
    const element = document.getElementById("register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hackathon"
      className="py-16 sm:py-20 md:py-32 bg-linear-to-b from-[#0a0a0a] to-[#1a0505]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-linear-to-br from-[#ff2c2c]/10 to-[#0a0a0a] p-6 sm:p-8 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl border-2 border-[#ff2c2c]/30 overflow-hidden backdrop-blur-sm">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent"></div>

          <div className="relative z-10">
            <div className="inline-block bg-[#ff2c2c] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              UPCOMING EVENT
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Fugal Labs Hackathon 2025
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#bbbbbb] mb-6 sm:mb-8 max-w-3xl leading-relaxed">
              Join us for an intense 24-hour coding marathon where innovation
              meets collaboration. Build groundbreaking projects, win exciting
              prizes, and connect with industry leaders and fellow developers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="bg-[#0a0a0a]/50 p-4 sm:p-6 rounded-xl border border-[#ff2c2c]/20 text-center">
                <div className="text-[#ff2c2c] text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                  DATE
                </div>
                <div className="text-white text-base sm:text-xl font-bold">
                  Feb 15-16, 2025
                </div>
              </div>

              <div className="bg-[#0a0a0a]/50 p-4 sm:p-6 rounded-xl border border-[#ff2c2c]/20 text-center">
                <div className="text-[#ff2c2c] text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                  TIME
                </div>
                <div className="text-white text-base sm:text-xl font-bold">
                  24 Hours
                </div>
              </div>

              <div className="bg-[#0a0a0a]/50 p-4 sm:p-6 rounded-xl border border-[#ff2c2c]/20 text-center">
                <div className="text-[#ff2c2c] text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                  VENUE
                </div>
                <div className="text-white text-base sm:text-xl font-bold">
                  TBA
                </div>
              </div>
            </div>

            <button
              onClick={scrollToRegister}
              className="w-full sm:w-auto bg-[#ff2c2c] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-[#e62828] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#ff2c2c]/50"
            >
              Register for Hackathon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
