"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useLayoutEffect, useState } from "react";
import { Button } from "./button";

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const handleToggle = () => {
    setIsPressed(true);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setTimeout(() => setIsPressed(false), 250);
  };

  const isClient = typeof window !== "undefined";

  return (
    <Button
      aria-label="Toggle theme"
      onClick={handleToggle}
      className={`group relative flex items-center justify-center w-10 h-10 rounded-full border border-accent bg-background shadow-lg transition-transform duration-200 focus:outline-none hover:scale-110 active:scale-95 ${isPressed ? "scale-90" : ""} hover:bg-accent/50`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {isClient ? (
          resolvedTheme === "dark" ? (
            <Sun
              className={`h-6 w-6 text-accent-foreground drop-shadow-md transition-transform duration-200 ${isPressed ? "scale-90" : ""}`}
            />
          ) : (
            <Moon
              className={`h-6 w-6 text-accent-foreground drop-shadow-md ${isPressed ? "scale-90" : ""}`}
            />
          )
        ) : (
          <div className="h-6 w-6" />
        )}
      </div>
    </Button>
  );
}
