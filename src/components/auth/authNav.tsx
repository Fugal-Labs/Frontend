"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const ThemeToggleButton = dynamic(
  () => import("../ui/theme-toggle").then((m) => m.ThemeToggleButton),
  { ssr: false }
);

export default function AuthNav() {
  const router = useRouter();
  return (
    <nav className="fixed top-0 left-0 w-full bg-background/95 border border-b-accent p-4 shadow-md z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <h1
            onClick={() => router.back()}
            className="hover:underline cursor-pointer text-lg"
          >
            &lt;- Back
          </h1>
        </div>
        <div className="text-2xl font-bold flex gap-4 items-center">
          <ThemeToggleButton />
          <h1>
            Fugal<span className="text-red-500">Labs</span>
          </h1>
        </div>
      </div>
    </nav>
  );
}
