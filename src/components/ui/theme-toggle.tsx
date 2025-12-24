"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "./button";

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const handleToggle = () => {
    if (!resolvedTheme) return;

    setIsPressed(true);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

    setTimeout(() => setIsPressed(false), 250);
  };

  // 🔑 Hydration-safe guard
  if (!resolvedTheme) {
    return (
      <Button
        aria-label="Toggle theme"
        disabled
        className="w-10 h-10 rounded-full border border-accent bg-background"
      />
    );
  }

  const Icon = resolvedTheme === "dark" ? Sun : Moon;

  return (
    <Button
      aria-label="Toggle theme"
      onClick={handleToggle}
      className={`group relative flex items-center justify-center w-10 h-10 rounded-full border border-accent bg-background shadow-lg transition-transform duration-200 focus:outline-none hover:scale-110 active:scale-95 hover:bg-accent/50 ${
        isPressed ? "scale-90" : ""
      }`}
    >
      <Icon
        className={`h-6 w-6 text-accent-foreground drop-shadow-md transition-transform duration-200 ${
          isPressed ? "scale-90" : ""
        }`}
      />
    </Button>
  );
}
