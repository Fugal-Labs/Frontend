import About from "@/components/home/About";
import Benefits from "@/components/home/Benefits";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import NavBar from "@/components/home/NavBar";
import Sponsors from "@/components/home/Sponsors";
import InteractiveBackground from "@/components/ui/interactive-bg";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <InteractiveBackground />
      <NavBar />
      <main className="pt-4 sm:pt-4 md:pt-8">
        {" "}
        {/* Add padding to prevent NavBar overlap */}
        <Hero />
        <About />
        <Benefits />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
}
