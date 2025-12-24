"use client";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      {/* ===== Content ===== */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-40 pb-24 sm:pb-32 flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-foreground text-center animate-fade-in-up">
          Empowering College Devs at
          <span className="block text-primary-red drop-shadow-xl mt-2">
            Fugal Labs
          </span>
        </h1>

        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-[26px] text-muted max-w-3xl text-center leading-relaxed px-2 animate-fade-in-up [animation-delay:0.15s]">
          A vibrant community of builders, creators, and innovators.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>We are kickstarting our journey
          with high-impact hackathons.
        </p>
      </div>
    </section>
  );
}
