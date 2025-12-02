"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", id: "about" },
    { label: "Hackathon", id: "hackathon" },
    { label: "Sponsors", id: "sponsors" },
    { label: "Benefits", id: "benefits" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#ff2c2c]/20 transition-all
      ${scrolled ? "bg-[#0a0a0a]/90 shadow-lg shadow-black/20" : "bg-[#0a0a0a]/80"}`}
    >
      <div className="mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-around min-h-14 sm:min-h-16 md:min-h-20">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Image
              src="/Fugal_Labs_logo.png"
              alt="Fugal Labs Logo"
              width={60}
              height={60}
              className="cursor-pointer object-contain sm:w-[70px] sm:h-[70px] md:w-[75px] md:h-[75px]"
              onClick={() => scrollToSection("hero")}
            />
          </div>

          {/* Nav Items - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[#cccccc] hover:text-white transition-colors text-sm font-medium tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Register Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("register")}
              className="bg-[#ff2c2c] text-white px-6! py-2.5! rounded-full hover:bg-[#e62828] transition-all font-semibold shadow-md hover:shadow-[#ff2c2c]/40"
            >
              Register
            </button>
          </div>

          {/* Mobile Register Button */}
          <button
            onClick={() => scrollToSection("register")}
            className="md:hidden bg-[#ff2c2c] text-white px-5! py-2.5! text-sm rounded-full hover:bg-[#e62828] transition-all font-semibold shadow active:scale-95"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
}
