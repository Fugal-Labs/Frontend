"use client";

import { useAuthStore } from "@/store/auth-store";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Benefits from "@/components/home/Benefits";
import Sponsors from "@/components/home/Sponsors";
import UserInfo from "@/components/home/dashboard/Info";

export default function HomeClientGate() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <>
        <Hero />
        <About />
        <Benefits />
        <Sponsors />
      </>
    );
  }

  return (
    <div className="mt-24">
      <UserInfo />
    </div>
  );
}
