"use client";
import { NavItems } from "@/types/home";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const HamburgerMenu = dynamic(() => import("./HamburgerMenu"), { ssr: false });
const ThemeToggleButton = dynamic(
  () => import("../ui/theme-toggle").then((m) => m.ThemeToggleButton),
  { ssr: false }
);

const navItems: NavItems[] = [
  {
    label: "Home",
    id: "home",
    link: "/",
  },
  {
    label: "Hackathons",
    id: "hackathons",
    link: "/hackathons",
  },
  {
    label: "Problems",
    id: "problems",
    link: "/problems",
  },
  {
    label: "Courses",
    id: "courses",
    link: "/courses",
  },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/95 border border-b-accent p-4 shadow-md z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center min-w-0">
          <Image
            src="/Fugal_Labs_logo.png"
            alt="Fugal Labs Logo"
            width={0}
            height={0}
            sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 140px"
            className="w-24 sm:w-32 md:w-36 h-auto object-contain"
          />
        </div>
        {/* Desktop Nav */}
        <ul className="hidden sm:flex flex-row justify-center space-x-4">
          {navItems.map((element) => (
            <li key={element.id}>
              <Link
                href={element.link || "/"}
                className={`text-primary hover:bg-accent/90 p-2 rounded-xl ${
                  pathname === element.link ? "bg-accent" : ""
                }`}
              >
                {element.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Desktop Buttons */}
        <div className="hidden sm:flex flex-row gap-2 items-center">
          <ThemeToggleButton />
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Log In
          </Button>
          <Button
            className="ml-2 cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="sm:hidden flex items-center px-2 py-1 text-3xl text-primary-red focus:outline-none"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
        {/* Hamburger Menu Drawer */}
        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </nav>
  );
}
