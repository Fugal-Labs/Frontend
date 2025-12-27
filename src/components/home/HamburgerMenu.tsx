"use client";
import { NavItems } from "@/types/home";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ThemeToggleButton } from "../ui/theme-toggle";
import { useRouter } from "next/navigation";

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

export default function HamburgerMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}
    >
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-background shadow-lg z-50 transform transition-transform duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-2xl text-primary-red focus:outline-none"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
        <ul className="flex flex-col mt-20 space-y-4 px-8">
          {navItems.map((element) => (
            <li key={element.id}>
              <Link
                href={element.link || "/"}
                className={`block text-lg font-semibold rounded-xl px-4 py-2 text-primary hover:bg-accent/90 transition-colors ${pathname === element.link ? "bg-accent" : ""}`}
                onClick={onClose}
              >
                {element.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 px-8 mt-8">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 min-w-0"
              onClick={() => {
                onClose();
                router.push("/login");
              }}
            >
              Log In
            </Button>
            <Button
              className="flex-1 min-w-0"
              onClick={() => {
                onClose();
                router.push("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
        {/* Move ThemeToggleButton to bottom left, absolutely positioned */}
        <div className="fixed bottom-6 left-6 z-50">
          <ThemeToggleButton />
        </div>
      </nav>
    </div>
  );
}
