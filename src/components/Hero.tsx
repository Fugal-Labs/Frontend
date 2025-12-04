"use client";

export default function Hero() {
  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* ===== Background Glow Effects ===== */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[-100px] -left-20 w-[450px] h-[450px] bg-[#ff2c2c] opacity-20 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-50px] w-[500px] h-[500px] bg-[#ff2c2c] opacity-20 blur-[160px] rounded-full animate-pulse [animation-delay:1.3s]" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-40 pb-24 sm:pb-32 flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white text-center animate-fade-in-up">
          Empowering College Devs at
          <span className="block text-[#ff2c2c] drop-shadow-xl mt-2">
            Fugal Labs
          </span>
        </h1>

        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-[26px] text-[#c7c7c7] max-w-3xl text-center leading-relaxed px-2 animate-fade-in-up [animation-delay:0.15s]">
          A vibrant community of builders, creators, and innovators.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>We are kickstarting our journey
          with high-impact hackathons.
        </p>

        {/* CTA */}
        <button
          onClick={scrollToRegister}
          className="mt-8 sm:mt-10 bg-[#ff2c2c] text-white px-8! sm:px-12! py-3.5! sm:py-4! rounded-full text-base sm:text-lg font-bold 
          hover:bg-[#e62828] transition-all hover:scale-[1.06] active:scale-95 hover:shadow-[0_0_20px_#ff2c2c90] shadow-lg animate-fade-in-up [animation-delay:0.25s]"
        >
          Register Now
        </button>
      </div>
    </section>
  );
}
